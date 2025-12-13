/**
 * CookieHelper
 * مجموعه توابع کمکی برای مدیریت cookie در مرورگر
 */
export const CookieHelper = {
  /**
   * گرفتن مقدار cookie با نام مشخص
   * @param name نام cookie
   * @returns مقدار cookie یا undefined اگر وجود نداشته باشد
   */
  get(name: string) {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
      )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  },

  /**
   * ست کردن cookie با نام و مقدار مشخص
   * @param name نام cookie
   * @param value مقدار cookie
   * @param opts گزینه‌ها (اختیاری)
   *   - expiresDays: تعداد روز تا انقضای cookie
   *   - path: مسیر cookie (پیش‌فرض '/')
   */
  set(
    name: string,
    value: string,
    opts?: { expiresDays?: number; path?: string }
  ) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (opts?.expiresDays != null) {
      const d = new Date()
      d.setTime(d.getTime() + opts.expiresDays * 24 * 3600 * 1000)
      cookie += `; expires=${d.toUTCString()}`
    }

    cookie += `; path=${opts?.path || '/'}`
    document.cookie = cookie
  },

  /**
   * حذف cookie با نام مشخص
   * @param name نام cookie که باید حذف شود
   */
  delete(name: string) {
    // حذف با ست کردن expires منفی
    this.set(name, '', { expiresDays: -1 })
  }
}
