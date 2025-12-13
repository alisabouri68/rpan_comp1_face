// middlewares/middlewareManager.ts

/**
 * Middleware Manager
 *
 * این فایل یک سیستم مرکزی برای:
 * - ثبت (register) میدلورها
 * - فعال/غیرفعال کردن آن‌ها
 * - اجرای ترتیبی میدلورها
 * - اشتراک‌گذاری context بین میدلورها
 *
 * کاربرد اصلی:
 * - Route Guards
 * - Permission / Auth / Feature Flag middleware
 * - Pipeline اجرای منطق قبل از render یا navigation
 */

/* -------------------------------------------------------------------------- */
/*                               Context Types                                */
/* -------------------------------------------------------------------------- */

/**
 * Context مشترک بین تمام middlewareها
 *
 * این context مشابه AuthContext و PermissionContext طراحی شده
 * و در طول اجرای middlewareها mutate می‌شود.
 */
export interface MiddlewareContext {
  /**
   * تابع navigate (معمولاً از React Router)
   * required است تا middlewareها بتوانند redirect انجام دهند
   */
  navigate: (path: string, options?: any) => void;

  /**
   * اطلاعات location فعلی
   * برای تصمیم‌گیری‌های وابسته به مسیر
   */
  location: {
    pathname: string;
    search?: string;
    hash?: string;
  };

  /**
   * اطلاعات کاربر (اختیاری)
   * معمولاً توسط auth middleware مقداردهی می‌شود
   */
  user?: any;

  /**
   * امکان افزودن هر داده‌ی دلخواه دیگر
   * middlewareها می‌توانند داده‌های جدید به context تزریق کنند
   */
  [key: string]: any;
}

/**
 * نتیجه‌ی اجرای هر middleware به‌صورت مستقل
 */
export interface MiddlewareResult {
  success: boolean;
  data?: any;
  error?: Error;
}

/**
 * نتیجه‌ی نهایی اجرای یک pipeline از middlewareها
 */
export interface ExecutionResult {
  /**
   * نتیجه‌ی هر middleware بر اساس نام آن
   */
  results: { [key: string]: MiddlewareResult };

  /**
   * context نهایی پس از اجرای همه middlewareها
   */
  context: MiddlewareContext;
}

/**
 * ساختار داخلی برای نگهداری middlewareهای ثبت‌شده
 */
export interface RegisteredMiddleware {
  name: string;
  middleware: (context: MiddlewareContext) => Promise<any>;
  enabled: boolean;
}

/**
 * تایپ ساده‌شده‌ی Middleware
 * هر middleware یک تابع async است که context را دریافت می‌کند
 */
type Middleware = (context: MiddlewareContext) => Promise<any>;

/* -------------------------------------------------------------------------- */
/*                            MiddlewareManager Class                          */
/* -------------------------------------------------------------------------- */

export class MiddlewareManager {
  /**
   * لیست middlewareهای ثبت‌شده
   * key = name
   */
  private middlewares: Map<string, RegisteredMiddleware>;

  /**
   * context سراسری که بین اجراها share می‌شود
   */
  private context: MiddlewareContext;

  constructor() {
    this.middlewares = new Map();

    // مقدار پیش‌فرض context
    // تضمین می‌کند که navigate و location همیشه وجود دارند
    this.context = {
      navigate: () => {}, // no-op function
      location: { pathname: '/' }
    };
  }

  /* ------------------------------------------------------------------------ */
  /*                             Registration API                             */
  /* ------------------------------------------------------------------------ */

  /**
   * ثبت یک middleware جدید
   *
   * @param name - نام یکتا برای middleware
   * @param middleware - تابع middleware
   * @param enabled - وضعیت فعال/غیرفعال (پیش‌فرض: true)
   */
  register(
    name: string,
    middleware: Middleware,
    enabled: boolean = true
  ): void {
    this.middlewares.set(name, {
      name,
      middleware,
      enabled
    });
  }

  /**
   * حذف middleware بر اساس نام
   *
   * @returns true اگر با موفقیت حذف شود
   */
  unregister(name: string): boolean {
    return this.middlewares.delete(name);
  }

  /**
   * فعال یا غیرفعال کردن middleware
   */
  setMiddlewareStatus(name: string, enabled: boolean): boolean {
    const middleware = this.middlewares.get(name);

    if (middleware) {
      middleware.enabled = enabled;
      return true;
    }

    return false;
  }

  /**
   * دریافت لیست تمام middlewareهای ثبت‌شده
   */
  getRegisteredMiddlewares(): RegisteredMiddleware[] {
    return Array.from(this.middlewares.values());
  }

  /* ------------------------------------------------------------------------ */
  /*                               Context API                                 */
  /* ------------------------------------------------------------------------ */

  /**
   * ست کردن context سراسری
   * مقدار جدید با context قبلی merge می‌شود
   */
  setContext(context: Partial<MiddlewareContext>): this {
    this.context = { ...this.context, ...context };
    return this;
  }

  /**
   * پاک‌سازی context و بازگشت به مقدار پیش‌فرض
   */
  clearContext(): void {
    this.context = {
      navigate: () => {},
      location: { pathname: '/' }
    };
  }

  /**
   * دریافت یک کپی از context فعلی
   */
  getContext(): MiddlewareContext {
    return { ...this.context };
  }

  /* ------------------------------------------------------------------------ */
  /*                             Execution Methods                             */
  /* ------------------------------------------------------------------------ */

  /**
   * اجرای middlewareها بر اساس نام آن‌ها
   *
   * @param middlewareNames - آرایه‌ای از نام middlewareها
   * @param localContext - context محلی مخصوص این اجرا
   */
  async executeByName(
    middlewareNames: string[],
    localContext: Partial<MiddlewareContext> = {}
  ): Promise<ExecutionResult> {
    const middlewares: Middleware[] = [];

    for (const name of middlewareNames) {
      const registered = this.middlewares.get(name);

      if (registered && registered.enabled) {
        middlewares.push(registered.middleware);
      } else if (!registered) {
        throw new Error(`Middleware '${name}' is not registered`);
      }
    }

    return this.execute(middlewares, localContext);
  }

  /**
   * اجرای مستقیم آرایه‌ای از middlewareها
   *
   * ترتیب اجرا حفظ می‌شود
   * در صورت throw شدن خطا، execution متوقف می‌شود
   */
  async execute(
    middlewares: Middleware[],
    localContext: Partial<MiddlewareContext> = {}
  ): Promise<ExecutionResult> {
    /**
     * context نهایی اجرا
     * ترکیب context سراسری + context محلی
     */
    const executionContext: MiddlewareContext = {
      ...this.context,
      ...localContext
    } as MiddlewareContext;

    const results: { [key: string]: MiddlewareResult } = {};

    for (const [index, middleware] of middlewares.entries()) {
      const middlewareName =
        this.getMiddlewareName(middleware) || `middleware_${index}`;

      try {
        const result = await middleware(executionContext);

        /**
         * اگر middleware یک object برگرداند،
         * به context تزریق می‌شود (context mutation)
         */
        if (result && typeof result === 'object') {
          Object.assign(executionContext, result);
        }

        results[middlewareName] = {
          success: true,
          data: result
        };
      } catch (error) {
        /**
         * در صورت خطا:
         * - نتیجه ثبت می‌شود
         * - خطا دوباره throw می‌شود تا execution متوقف شود
         */
        results[middlewareName] = {
          success: false,
          error: error as Error
        };

        throw error;
      }
    }

    return {
      results,
      context: executionContext
    };
  }

  /* ------------------------------------------------------------------------ */
  /*                              Helper Methods                               */
  /* ------------------------------------------------------------------------ */

  /**
   * پیدا کردن نام middleware از روی reference تابع
   * (برای گزارش و logging)
   */
  private getMiddlewareName(middleware: Middleware): string | null {
    for (const [name, registered] of this.middlewares.entries()) {
      if (registered.middleware === middleware) {
        return name;
      }
    }
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                         Singleton Instance Export                           */
/* -------------------------------------------------------------------------- */

/**
 * instance سراسری MiddlewareManager
 * قابل استفاده در کل پروژه
 */
export const middlewareManager = new MiddlewareManager();
