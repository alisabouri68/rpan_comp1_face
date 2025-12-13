/**
 * LocalStorageLayer
 * لایه ساده برای دسترسی به localStorage با متدهای get, set, delete
 */
export const LocalStorageLayer = {
  /**
   * خواندن مقدار از localStorage
   * @param key کلید مورد نظر
   * @returns مقدار ذخیره‌شده یا null اگر موجود نباشد
   */
  get (key: string): string | null {
    return localStorage.getItem(key)
  },

  /**
   * ذخیره مقدار در localStorage
   * @param key کلید مورد نظر
   * @param value مقدار رشته‌ای که باید ذخیره شود
   */
  set (key: string, value: string): void {
    localStorage.setItem(key, value)
  },

  /**
   * حذف مقدار از localStorage
   * @param key کلید مورد نظر
   */
  delete (key: string): void {
    localStorage.removeItem(key)
  }
}
