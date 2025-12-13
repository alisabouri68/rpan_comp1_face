/**
 * defaultSerializer
 * serializer پیش‌فرض برای persist کردن داده‌ها در storage
 * - تبدیل Date به یک ساختار قابل stringify
 * - بازگرداندن Date هنگام deserialize
 */
export const defaultSerializer = {
  /**
   * تبدیل مقدار به string برای ذخیره
   * @param v مقدار قابل ذخیره (object, array, Date, primitive)
   * @returns string JSON
   */
  serialize: (v: any): string =>
    JSON.stringify(v, (_k, val) =>
      val instanceof Date ? { __isDate: true, value: val.toISOString() } : val
    ),

  /**
   * تبدیل string JSON به مقدار واقعی
   * @param s string JSON
   * @returns مقدار اصلی با بازگرداندن Date ها
   */
  deserialize: (s: string): any =>
    JSON.parse(s, (_k, val) => (val?.__isDate ? new Date(val.value) : val))
}
