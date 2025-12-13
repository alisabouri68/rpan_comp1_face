// middlewares/permissionMiddleware.ts

/**
 * Permission middleware interfaces and implementation.
 *
 * این فایل یک middleware کلی برای بررسی پرمیشن‌ها در لایه‌ی میانی برنامه (مثلاً در route guards یا قبل از اجرای اکشن‌ها)
 * فراهم می‌کند. هدف: یک مکانیزم قابل پیکربندی برای بررسی پرمیشن‌های کاربر، اجرای چک‌های سفارشی و
 * تصمیم‌گیری در مورد ریدایرکت هنگام عدم دسترسی.
 *
 * توجه: این کد در محیط مرورگر طراحی شده (از localStorage و atob استفاده می‌کند).
 * اگر در محیط سرور اجرا می‌شود، لازم است توابع معادل (برای خواندن توکن/پرمیشن) جایگزین شوند.
 */

/**
 * گزینه‌های قابل تنظیم برای middleware
 */
export interface PermissionMiddlewareOptions {
  /**
   * حالت بررسی پرمیشن‌ها:
   * - 'every'  : تمام requiredPermissions باید در userPermissions وجود داشته باشند (پیش‌فرض)
   * - 'some'   : حداقل یکی از requiredPermissions باید وجود داشته باشد
   * - 'none'   : هیچ‌یک از requiredPermissions نباید در userPermissions باشد
   */
  checkMode?: 'every' | 'some' | 'none';

  /**
   * اگر false باشد، در هنگام عدم دسترسی از ریدایرکت صرف‌نظر می‌شود و فقط خطا پرتاب می‌شود.
   * پیش‌فرض true (ریدایرکت در صورت قابل دسترس بودن تابع navigate).
   */
  redirectOnFail?: boolean;

  /**
   * تابع بررسی سفارشی — اگر وجود داشته باشد، قبل از بررسی معمول اجرا می‌شود.
   * باید یک Promise<CustomCheckResult> برگرداند؛ اگر granted=false برگردد، middleware شکست می‌خورد.
   */
  customCheck?: (params: CustomCheckParams) => Promise<CustomCheckResult>;

  /**
   * تابعی که لیست پرمیشن‌های کاربر را به صورت async بازمی‌گرداند.
   * اگر تعیین شود، به‌جای خواندن از context.user یا localStorage استفاده می‌شود.
   */
  permissionResolver?: () => Promise<string[]>;
}

/**
 * کانتکستی که middleware دریافت می‌کند؛
 * می‌تواند تابع navigate برای ریدایرکت و اطلاعات کاربر را شامل شود.
 */
export interface PermissionContext {
  navigate?: (path: string, options?: any) => void;
  user?: {
    id?: string;
    email?: string;
    roles: string[];
    permissions: string[];
  };
}

/**
 * پارامترهایی که به customCheck ارسال می‌شوند.
 * شامل requiredPermissions (چیزی که نیاز است) و userPermissions (پرمیژن‌های واقعی کاربر)
 */
export interface CustomCheckParams {
  requiredPermissions: string[];
  userPermissions: string[];
  user?: any;
  context: PermissionContext;
}

/**
 * نتیجه‌ای که تابع customCheck باید بازگرداند.
 */
export interface CustomCheckResult {
  granted: boolean;
  message?: string; // توضیح یا پیام خطا (اختیاری)
}

/**
 * نتیجه‌ی نهایی middleware که به کالر برمی‌گردد در صورت موفقیت.
 */
export interface PermissionResult {
  granted: boolean;
  userPermissions: string[];
  requiredPermissions: string[];
  missingPermissions?: string[]; // در صورت موفقیت نیز ممکن است خالی یا پر باشد (بسته به حالت)
}

/**
 * کلاس ارور اختصاصی برای خطاهای مربوط به پرمیشن‌ها.
 * شامل اطلاعات تکمیلی که می‌تواند برای دیباگ یا ریدایرکت استفاده شود.
 */
class PermissionError extends Error {
  public code: string;
  public requiredPermissions: string[];
  public userPermissions: string[];
  public missingPermissions: string[]; 
  public timestamp: string;

  constructor(
    message: string, 
    code: string, 
    requiredPermissions: string[] = [], 
    userPermissions: string[] = [],
    missingPermissions: string[] = [] 
  ) {
    super(message);
    this.name = 'PermissionError';
    this.code = code;
    this.requiredPermissions = requiredPermissions;
    this.userPermissions = userPermissions;
    this.missingPermissions = missingPermissions;
    this.timestamp = new Date().toISOString();
  }
}

/* -----------------------
   تابع کمکی برای parse JWT
   توضیح: این تابع payload توکن JWT را بدون verify استخراج می‌کند.
   ⚠️ هشدار امنیتی: این فقط برای استخراج داده‌ها مناسب است و اعتبار توکن را بررسی نمی‌کند.
   برای امنیت بالا حتماً توکن را در سمت سرور Verify کنید.
   همچنین تابع atob در محیط مرورگر موجود است؛ در Node.js باید از Buffer استفاده شود.
------------------------ */
const parseJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    // بازگرداندن base64 استاندارد از base64url
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    // در صورت هرگونه خطا (توکن نامعتبر یا ساختار نادرست) null برگردانده می‌شود
    return null;
  }
};

/**
 * خواندن پرمیشن‌ها از localStorage یا از توکن auth_token
 * - ابتدا سعی می‌کند مقدار ذخیره‌شده در 'user_permissions' را بخواند.
 * - در صورت نبودن، توکن JWT را از 'auth_token' استخراج کرده و از payload.permissions استفاده می‌کند.
 * - در صورت شکست، آرایه خالی برمی‌گرداند.
 *
 * توجه: localStorage فقط در مرورگر وجود دارد؛ در محیط‌های دیگر باید جایگزین شود.
 */
const getPermissionsFromStorage = async (): Promise<string[]> => {
  try {
    const stored = localStorage.getItem('user_permissions');
    if (stored) {
      return JSON.parse(stored) as string[];
    }

    const token = localStorage.getItem('auth_token');
    if (token) {
      const payload = parseJWT(token);
      return payload?.permissions || [];
    }

    return [];
  } catch {
    // در صورت خطا (مثلاً JSON نامعتبر)، به صورت امن آرایه خالی برمی‌گردانیم
    return [];
  }
};

/**
 * تابع اصلی middleware
 *
 * @param requiredPermissions - لیست پرمیشن‌های مورد نیاز برای دسترسی
 * @param options - گزینه‌های پیکربندی middleware
 * @returns تابع async که یک PermissionResult را برمی‌گرداند یا خطا پرتاب می‌کند
 *
 * رفتار کلی:
 * 1. اگر requiredPermissions خالی باشد => دسترسی پذیرفته می‌شود.
 * 2. پرمیشن‌های کاربر از: context.user.permissions یا permissionResolver یا localStorage خوانده می‌شوند.
 * 3. اگر customCheck تعیین شده باشد، اجرا می‌شود و در صورت شکست خطا پرتاب می‌شود.
 * 4. بررسی بر اساس checkMode انجام می‌شود (every|some|none).
 * 5. اگر دسترسی کافی نباشد، PermissionError ساخته و در صورت فعال بودن redirectOnFail و وجود navigate ریدایرکت انجام می‌شود.
 * 6. در صورت موفقیت، PermissionResult برگردانده می‌شود (شامل missingPermissions).
 */
export const permissionMiddleware = (
  requiredPermissions: string[] = [], 
  options: PermissionMiddlewareOptions = {}
) => {
  const {
    checkMode = 'every',
    redirectOnFail = true,
    customCheck = null,
    permissionResolver = null
  } = options;

  // بازگشت یک تابع که با context فراخوانی می‌شود (مثلاً در route guard)
  return async (context: PermissionContext = {}): Promise<PermissionResult> => {
    const { navigate, user } = context;
    
    try {
      // اگر نیاز به پرمیشن وجود ندارد — فوراً موفق بازگردانده می‌شود
      if (!requiredPermissions || requiredPermissions.length === 0) {
        return { 
          granted: true, 
          userPermissions: [], 
          requiredPermissions: [] 
        };
      }

      // 1. دریافت پرمیشن‌های کاربر — از context.user، سپس از permissionResolver، و در نهایت localStorage
      let userPermissions: string[] = [];
      
      if (user?.permissions) {
        userPermissions = user.permissions;
      } else if (permissionResolver) {
        userPermissions = await permissionResolver();
      } else {
        userPermissions = await getPermissionsFromStorage();
      }

      // 2. ساختار پرمیشن‌ها باید آرایه باشد؛ در غیر این صورت خطا می‌دهیم
      if (!Array.isArray(userPermissions)) {
        throw new PermissionError(
          'Invalid user permissions format',
          'INVALID_PERMISSIONS_FORMAT',
          requiredPermissions,
          userPermissions as string[],
          [] // missingPermissions خالی
        );
      }

      // 3. اجرای بررسی سفارشی در صورت وجود
      if (customCheck) {
        const customResult = await customCheck({
          requiredPermissions,
          userPermissions,
          user,
          context
        });
        
        if (!customResult.granted) {
          // اگر چک سفارشی موفق نبود، خطا با کد متفاوت پرتاب می‌کنیم تا دیتای مناسب در ریدایرکت برقرار شود
          throw new PermissionError(
            customResult.message || 'Custom permission check failed',
            'CUSTOM_CHECK_FAILED',
            requiredPermissions,
            userPermissions,
            [] // missingPermissions خالی
          );
        }
      }

      // 4. بررسی پرمیشن‌ها بر اساس checkMode و محاسبه missingPermissions برای گزارش
      let hasPermission = false;
      let missingPermissions: string[] = [];
      
      switch (checkMode) {
        case 'every':
          hasPermission = requiredPermissions.every(perm => 
            userPermissions.includes(perm)
          );
          missingPermissions = requiredPermissions.filter(perm => 
            !userPermissions.includes(perm)
          );
          break;
          
        case 'some':
          hasPermission = requiredPermissions.some(perm => 
            userPermissions.includes(perm)
          );
          // در حالت some، اگر هیچ‌یک از پرمیشن‌ها یافت نشد، همه‌ی requiredPermissions به عنوان missing در نظر گرفته می‌شوند
          missingPermissions = hasPermission ? [] : requiredPermissions;
          break;
          
        case 'none':
          // 'none' به معنی این است که کاربر نباید هیچ‌کدام از این پرمیشن‌ها را داشته باشد
          hasPermission = !requiredPermissions.some(perm => 
            userPermissions.includes(perm)
          );
          // اگر کاربر یکی از پرمیشن‌ها را داشته باشد، همان‌ها به عنوان missing (دلایل ناتوانی) گزارش می‌شوند
          missingPermissions = hasPermission ? [] : requiredPermissions.filter(perm =>
            userPermissions.includes(perm)
          );
          break;
          
        default:
          // fallback به رفتار پیش‌فرض 'every'
          hasPermission = requiredPermissions.every(perm => 
            userPermissions.includes(perm)
          );
          missingPermissions = requiredPermissions.filter(perm => 
            !userPermissions.includes(perm)
          );
      }

      // 5. تصمیم نهایی: اگر دسترسی ندارد، خطا پرتاب شود — در catch پایین، در صورت enabled بودن ریدایرکت انجام می‌شود
      if (!hasPermission) {
        throw new PermissionError(
          `Insufficient permissions. Required: ${requiredPermissions.join(', ')}. Missing: ${missingPermissions.join(', ')}. You have: ${userPermissions.join(', ')}`,
          'INSUFFICIENT_PERMISSIONS',
          requiredPermissions,
          userPermissions,
          missingPermissions // استفاده از missingPermissions در خطا
        );
      }

      // موفقیت — نتیجه را بازمی‌گردانیم (شامل missingPermissions که معمولاً در این حالت خالی خواهد بود)
      return {
        granted: true,
        userPermissions,
        requiredPermissions,
        missingPermissions // بازگشت missingPermissions حتی در صورت موفقیت برای شفافیت
      };

    } catch (error) {
      // اگر خطا از نوع PermissionError و redirectOnFail فعال است و تابع navigate موجود است، ریدایرکت انجام شود
      if (error instanceof PermissionError && redirectOnFail && navigate) {
        // ارسال state به مسیر access-denied برای نمایش دلیل در UI
        navigate('/access-denied', {
          replace: true,
          state: {
            reason: error.code,
            requiredPermissions: error.requiredPermissions,
            userPermissions: error.userPermissions,
            missingPermissions: error.missingPermissions // استفاده در ریدایرکت
          }
        });
      }
      
      // خطا را دوباره به فراخوان (caller) پرتاب می‌کنیم تا در لوکیشن بالاتر نیز هندل شود
      throw error;
    }
  };
};
