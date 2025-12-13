/**
 * getByPath
 * دسترسی امن به یک مسیر nested در object
 * @param obj شیء اصلی
 * @param path مسیر به صورت 'a.b.c' (اختیاری)
 * @returns مقدار موجود در مسیر یا کل object اگر path undefined باشد
 */
export function getByPath(obj: any, path?: string) {
  if (!path) return obj
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), obj)
}

/**
 * shallowEqual
 * بررسی برابری سطح اول دو object
 * @param a شیء اول
 * @param b شیء دوم
 * @returns true اگر همه key-value های سطح اول برابر باشند
 */
export function shallowEqual(a: any, b: any) {
  if (a === b) return true
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false
  return aKeys.every(k => a[k] === b[k])
}

/**
 * deepEqual
 * بررسی برابری دو object یا array به صورت بازگشتی
 * @param a مقدار اول
 * @param b مقدار دوم
 * @returns true اگر همه مقادیر و ساختارها برابر باشند
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false
    if (Array.isArray(a)) return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]))
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (aKeys.length !== bKeys.length) return false
    return aKeys.every(k => deepEqual(a[k], b[k]))
  }
  return false
}
