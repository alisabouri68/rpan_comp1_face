/**
 * SessionStorageLayer
 * لایه ساده برای دسترسی به sessionStorage با متدهای get, set, delete
 */
export const SessionStorageLayer = {
  /**
   * خواندن مقدار از sessionStorage
   * @param key کلید مورد نظر
   * @returns مقدار ذخیره‌شده یا null اگر موجود نباشد
   */
  get(key: string): string | null {
    return sessionStorage.getItem(key)
  },

  /**
   * ذخیره مقدار در sessionStorage
   * @param key کلید مورد نظر
   * @param value مقدار رشته‌ای که باید ذخیره شود
   */
  set(key: string, value: string): void {
    sessionStorage.setItem(key, value)
  },

  /**
   * حذف مقدار از sessionStorage
   * @param key کلید مورد نظر
   */
  delete(key: string): void {
    sessionStorage.removeItem(key)
  }
}
