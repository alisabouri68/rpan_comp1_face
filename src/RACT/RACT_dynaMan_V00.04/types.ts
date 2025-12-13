// types.ts

/**
 * Callback که هنگام تغییر مقدار در DynaManager فراخوانی می‌شود.
 * @param value مقدار جدید path یا کل state
 */
export type DynaCallback = (value: any) => void

/**
 * لایه‌های ذخیره‌سازی که DynaManager می‌تواند استفاده کند.
 */
export type StorageLayer =
  | 'memory'    // cache داخلی در حافظه
  | 'local'     // localStorage
  | 'session'   // sessionStorage
  | 'cookie'    // cookie browser
  | 'indexedDB' // indexedDB (برای توسعه آینده)
  | 'none'      // بدون persistence

/**
 * تنظیمات persist برای یک مسیر (path) مشخص
 */
export interface PersistConfig {
  /** مسیر state که باید persist شود */
  path: string

  /** لایه‌های storage که مقدار در آن‌ها ذخیره شود */
  layers: StorageLayer[]

  /** زمان زندگی مقدار (TTL) بر حسب میلی‌ثانیه */
  ttlMs?: number

  /** کلید مورد استفاده در storage (اختیاری، default = path) */
  key?: string

  /** serializer سفارشی برای encode/decode مقدار (اختیاری) */
  serializer?: {
    /** تابع serialize برای تبدیل value به string */
    serialize: (v: any) => string
    /** تابع deserialize برای تبدیل string به value */
    deserialize: (s: string) => any
  }
}

/**
 * یک subscriber ثبت‌شده در DynaManager
 */
export interface SubscribeEntry {
  /** شناسه یکتا subscriber */
  id: symbol

  /** مسیر خاص برای subscription (اختیاری، اگر undefined کل state را دنبال می‌کند) */
  path?: string

  /** callback فراخوانی شده هنگام تغییر مقدار */
  cb: DynaCallback

  /** آخرین مقدار دریافت‌شده توسط subscriber (برای جلوگیری از notify غیرضروری) */
  lastValue?: any

  /** اگر true باشد، فقط تغییرات سطح اول (shallow) بررسی می‌شود */
  shallow?: boolean
}
