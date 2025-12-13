import { store } from 'RDUX/store'
import { setPath, mergePath, bulkSet as reduxBulkSet, reset } from 'RDUX/dynaEnv/dynaSlice'
import { MemoryLayer } from './layers/memory'
import { persistToLayers, readFromLayers, clearPersist } from './layers/persist'
import { getByPath, deepEqual } from './helpers/path'
import { PersistConfig, SubscribeEntry, DynaCallback } from './types'

/**
 * DynaManager
 * مدیریت state دینامیک با قابلیت:
 * - Redux integration
 * - Multi-layer persistence (Memory, LocalStorage, SessionStorage, Cookie)
 * - TTL (Time-To-Live)
 * - Debounced writes
 * - Subscriptions با notification هوشمند
 */
export class DynaManager {
  /** لیست subscriber ها */
  private subscribers: SubscribeEntry[] = []

  /** نگهداری تنظیمات persist برای path ها */
  private persistMap = new Map<string, PersistConfig>()

  /**
   * تنظیم persist configuration برای path های مشخص
   * @param cfgs آرایه PersistConfig برای مسیرهای مورد نظر
   */
  configurePersist(cfgs: PersistConfig[]) {
    for (const c of cfgs) this.persistMap.set(c.path, c)
  }

  /**
   * خواندن مقدار یک path با multi-layer fallback و TTL
   * ترتیب fallback:
   * MemoryLayer -> Redux -> storage layers (local/session/cookie)
   * @param path مسیر مورد نظر (optional)
   * @returns مقدار path یا کل state اگر path undefined باشد
   */
  async get(path?: string) {
    if (!path) return store.getState().dyna

    const cfg = this.persistMap.get(path)
    const reduxValue = getByPath(store.getState().dyna, path)

    if (cfg) return await readFromLayers(cfg, reduxValue)
    return reduxValue
  }

  /**
   * جایگزینی مقدار یک path
   * Redux dispatch + MemoryLayer + persist + notify subscribers
   * @param path مسیر مورد نظر
   * @param value مقدار جدید
   */
  set(path: string, value: any) {
    store.dispatch(setPath({ path, value }))

    const cfg = this.persistMap.get(path)
    if (cfg) persistToLayers(cfg, value)

    const key = cfg?.key ?? path
    MemoryLayer.set(key, value)

    this.notifySubscribers(path)
  }

  /**
   * ادغام (shallow merge) مقدار با مقدار قبلی
   * @param path مسیر مورد نظر
   * @param value مقدار جدید برای merge
   */
  merge(path: string, value: any) {
    store.dispatch(mergePath({ path, value }))

    const cfg = this.persistMap.get(path)
    const key = cfg?.key ?? path

    const prev = MemoryLayer.get(key) ?? getByPath(store.getState().dyna, path)
    const merged = { ...(prev ?? {}), ...value }
    MemoryLayer.set(key, merged)

    if (cfg) persistToLayers(cfg, merged)

    this.notifySubscribers(path)
  }

  /**
   * set همزمان چند path
   * @param values شیء با key = path و value = مقدار جدید
   */
  bulkSet(values: Record<string, any>) {
    store.dispatch(reduxBulkSet(values))

    for (const path in values) {
      const cfg = this.persistMap.get(path)
      const key = cfg?.key ?? path
      MemoryLayer.set(key, values[path])
      if (cfg) persistToLayers(cfg, values[path])
    }

    this.notifyAll()
  }

  /**
   * subscription برای تغییرات یک path مشخص یا کل state
   * @param cb callback که با مقدار جدید فراخوانی می‌شود
   * @param path مسیر مورد نظر (اختیاری)
   * @returns تابع unsubscribe برای حذف subscriber
   */
  subscribe(cb: DynaCallback, path?: string) {
    const id = Symbol()
    this.subscribers.push({ id, cb, path, lastValue: undefined })

    // اجرای اولیه مقدار async
    this.get(path).then(val => {
      const sub = this.subscribers.find(s => s.id === id)
      if (sub) { sub.lastValue = val; cb(val) }
    })

    return () => {
      this.subscribers = this.subscribers.filter(s => s.id !== id)
    }
  }

  /**
   * reset کامل state
   * Redux + MemoryLayer + persisted layers + notify subscribers
   * @param next مقدار جدید برای reset (اختیاری)
   */
  reset(next?: any) {
    store.dispatch(reset(next))
    MemoryLayer.clear()

    for (const [, cfg] of this.persistMap) {
      persistToLayers(cfg, next ? getByPath(next, cfg.path) : undefined)
    }

    this.notifyAll()
  }

  /**
   * notify subscribers فقط وقتی مقدار واقعی تغییر کرده باشد
   * @param path مسیر تغییر یافته
   */
  private async notifySubscribers(path: string) {
    for (const s of this.subscribers) {
      if (!s.path || s.path === path) {
        const val = await this.get(s.path)
        if (!deepEqual(val, s.lastValue)) {
          s.lastValue = val
          s.cb(val)
        }
      }
    }
  }

  /**
   * notify همه subscribers
   */
  private async notifyAll() {
    for (const s of this.subscribers) {
      const val = await this.get(s.path)
      if (!deepEqual(val, s.lastValue)) {
        s.lastValue = val
        s.cb(val)
      }
    }
  }
}

/** Singleton instance */
export const DynaMan = new DynaManager()
