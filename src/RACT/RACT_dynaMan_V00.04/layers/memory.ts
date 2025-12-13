/**
 * MemoryLayer
 * لایه cache داخلی در حافظه برای دسترسی سریع به مقادیر
 * استفاده در DynaManager برای multi-layer persistence
 */
const cache = new Map<string, any>()

export const MemoryLayer = {
  /**
   * خواندن مقدار از cache
   * @param key کلید مورد نظر
   * @returns مقدار ذخیره‌شده یا undefined اگر موجود نباشد
   */
  get (key: string): any {
    return cache.get(key)
  },

  /**
   * ذخیره مقدار در cache
   * @param key کلید مورد نظر
   * @param value مقدار قابل ذخیره
   */
  set (key: string, value: any): void {
    cache.set(key, value)
  },

  /**
   * حذف مقدار از cache
   * @param key کلید مورد نظر
   */
  delete (key: string): void {
    cache.delete(key)
  },

  /**
   * پاک کردن کامل cache
   */
  clear (): void {
    cache.clear()
  }
}
