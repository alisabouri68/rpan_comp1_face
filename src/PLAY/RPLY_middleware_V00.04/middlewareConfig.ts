// config/middlewareConfig.ts

/**
 * Middleware Configuration
 *
 * این فایل محل ثبت (register) تمام middlewareهای سراسری برنامه است.
 * MiddlewareManager به‌عنوان یک registry مرکزی عمل می‌کند
 * و middlewareها با نام مشخص در آن ثبت می‌شوند.
 *
 * مزیت این ساختار:
 * - جداسازی پیکربندی از منطق middleware
 * - قابلیت فعال/غیرفعال کردن middlewareها
 * - استفاده‌ی مجدد در route guards یا pipelineهای مختلف
 */

import { middlewareManager } from './middlewareManager';
import { authMiddleware } from './authMiddleware';
import { permissionMiddleware } from './permissionMiddleware';

/* -------------------------------------------------------------------------- */
/*                           Authentication Middleware                         */
/* -------------------------------------------------------------------------- */

/**
 * ثبت middleware احراز هویت
 *
 * وظایف این middleware:
 * - اعتبارسنجی توکن کاربر (مثلاً JWT)
 * - بررسی معتبر بودن session
 * - refresh خودکار توکن در صورت فعال بودن autoRefresh
 *
 * این middleware معمولاً:
 * - اطلاعات user را در context قرار می‌دهد
 * - در صورت نامعتبر بودن، redirect به login انجام می‌دهد
 */
middlewareManager.register(
  'authentication',
  authMiddleware({
    /**
     * endpoint بک‌اند برای بررسی اعتبار توکن
     */
    validationEndpoint: '/api/validate-token',

    /**
     * اگر true باشد:
     * - در صورت انقضای توکن، تلاش برای refresh انجام می‌شود
     */
    autoRefresh: true
  })
);

/* -------------------------------------------------------------------------- */
/*                            Permission Middleware                            */
/* -------------------------------------------------------------------------- */

/**
 * ثبت middleware بررسی پرمیشن
 *
 * نکته مهم:
 * - در اینجا requiredPermissions به‌صورت آرایه‌ی خالی ثبت شده
 * - پرمیشن‌های واقعی معمولاً در زمان اجرا (route-level یا feature-level)
 *   از طریق context یا اجرای مجدد middleware تعیین می‌شوند
 *
 * checkMode: 'every'
 * یعنی:
 * - کاربر باید تمام پرمیشن‌های موردنیاز را داشته باشد
 */
middlewareManager.register(
  'permission',
  permissionMiddleware(
    [],
    {
      checkMode: 'every'
    }
  )
);

/* -------------------------------------------------------------------------- */
/*                          Available Middlewares List                         */
/* -------------------------------------------------------------------------- */

/**
 * لیست middlewareهای قابل استفاده در سیستم:
 *
 * - 'authentication' : بررسی احراز هویت کاربر
 * - 'permission'     : بررسی دسترسی و پرمیشن‌ها
 *
 * این نام‌ها در MiddlewareManager.executeByName استفاده می‌شوند.
 *
 * مثال:
 * middlewareManager.executeByName(['authentication', 'permission'])
 */
