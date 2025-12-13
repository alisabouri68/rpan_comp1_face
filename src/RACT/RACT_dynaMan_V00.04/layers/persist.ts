import { MemoryLayer } from './memory'
import { LocalStorageLayer } from './localStorage'
import { SessionStorageLayer } from './sessionStorage'
import { CookieHelper } from './cookie'
import { PersistConfig } from '../types'
import { defaultSerializer } from '../helpers/serializer'

/** نگهداری تایمرهای debounce برای هر key */
const writeTimers = new Map<string, number>()

/** تاخیر پیش‌فرض برای debounce نوشتن به لایه‌ها (ms) */
const writeDelayMs = 150

/**
 * ذخیره مقدار در لایه‌ها با debounce و TTL
 * ترتیب لایه‌ها بر اساس cfg.layers مشخص شده است
 * @param cfg PersistConfig مربوط به path
 * @param value مقدار مورد نظر برای ذخیره
 */
export async function persistToLayers (cfg: PersistConfig, value: any) {
  const key = cfg.key ?? cfg.path
  let payload: any = value

  // اضافه کردن metadata TTL
  if (cfg.ttlMs) {
    payload = { __dyna_meta: { expiresAt: Date.now() + cfg.ttlMs }, value }
  }

  const ser = cfg.serializer ?? defaultSerializer
  const serialized = ser.serialize(payload)

  // پاک کردن تایمر قبلی در صورت وجود
  if (writeTimers.has(key)) clearTimeout(writeTimers.get(key))

  // تنظیم تایمر جدید برای debounce
  const timer = window.setTimeout(() => {
    for (const layer of cfg.layers) {
      try {
        if (layer === 'memory') MemoryLayer.set(key, payload)
        if (layer === 'local') LocalStorageLayer.set(key, serialized)
        if (layer === 'session') SessionStorageLayer.set(key, serialized)
        if (layer === 'cookie')
          CookieHelper.set(key, serialized, {
            expiresDays: Math.ceil((cfg.ttlMs ?? 0) / (24 * 3600 * 1000)) || 365
          })
      } catch (e) {
        console.warn('[DynaManager] persistToLayers error', layer, e)
      }
    }
    writeTimers.delete(key)
  }, writeDelayMs)

  writeTimers.set(key, timer)
}

/**
 * خواندن مقدار با fallback: Memory -> Redux -> storage layers
 * اگر TTL منقضی شده باشد مقدار پاک می‌شود
 * @param cfg PersistConfig مربوط به path
 * @param reduxValue مقدار fallback از Redux (اختیاری)
 * @returns مقدار نهایی یا undefined
 */
export async function readFromLayers (
  cfg: PersistConfig,
  reduxValue?: any
): Promise<any> {
  const key = cfg.key ?? cfg.path
  const ser = cfg.serializer ?? defaultSerializer

  // ابتدا memory
  const mem = MemoryLayer.get(key)
  if (mem !== undefined) return unwrapTTL(mem)

  // fallback redux
  if (reduxValue !== undefined) return reduxValue

  // سپس storage layers
  for (const layer of cfg.layers) {
    try {
      let raw: string | undefined
      if (layer === 'local') raw = LocalStorageLayer.get(key) ?? undefined
      if (layer === 'session') raw = SessionStorageLayer.get(key) ?? undefined
      if (layer === 'cookie') raw = CookieHelper.get(key)

      if (raw != null) {
        const data = ser.deserialize(raw)
        const unwrapped = unwrapTTL(data)
        if (unwrapped === undefined) {
          // expired -> پاک کردن از همه لایه‌ها
          await clearPersist(cfg)
          continue
        }
        // نوشتن در memory برای سرعت read بعدی
        MemoryLayer.set(key, data)
        return unwrapped
      }
    } catch (e) {
      console.warn('[DynaManager] readFromLayers error', layer, e)
    }
  }

  return undefined
}

/**
 * پاک کردن مقدار از همه لایه‌ها
 * @param cfg PersistConfig مربوط به path
 */
export async function clearPersist (cfg: PersistConfig) {
  const key = cfg.key ?? cfg.path
  for (const layer of cfg.layers) {
    try {
      if (layer === 'memory') MemoryLayer.delete(key)
      if (layer === 'local') LocalStorageLayer.delete(key)
      if (layer === 'session') SessionStorageLayer.delete(key)
      if (layer === 'cookie') CookieHelper.delete(key)
    } catch (e) {
      console.warn('[DynaManager] clearPersist error', layer, e)
    }
  }
}

/**
 * unwrap مقدار ذخیره‌شده با TTL
 * اگر منقضی شده باشد undefined برمی‌گرداند
 * @param data مقدار ذخیره‌شده
 * @returns مقدار واقعی یا undefined
 */
function unwrapTTL (data: any) {
  if (data?.__dyna_meta?.expiresAt && Date.now() > data.__dyna_meta.expiresAt)
    return undefined
  return data?.__dyna_meta ? data.value : data
}
