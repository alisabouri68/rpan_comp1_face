// middlewares/permissionMiddleware.ts

export interface PermissionMiddlewareOptions {
  checkMode?: 'every' | 'some' | 'none';
  redirectOnFail?: boolean;
  customCheck?: (params: CustomCheckParams) => Promise<CustomCheckResult>;
  permissionResolver?: () => Promise<string[]>;
}

export interface PermissionContext {
  navigate?: (path: string, options?: any) => void;
  user?: {
    id?: string;
    email?: string;
    roles: string[];
    permissions: string[];
  };
}

export interface CustomCheckParams {
  requiredPermissions: string[];
  userPermissions: string[];
  user?: any;
  context: PermissionContext;
}

export interface CustomCheckResult {
  granted: boolean;
  message?: string;
}

export interface PermissionResult {
  granted: boolean;
  userPermissions: string[];
  requiredPermissions: string[];
  missingPermissions?: string[]; // اضافه شد
}

export default class PermissionError extends Error {
  public code: string;
  public requiredPermissions: string[];
  public userPermissions: string[];
  public missingPermissions: string[]; // اضافه شد
  public timestamp: string;

  constructor(
    message: string, 
    code: string, 
    requiredPermissions: string[] = [], 
    userPermissions: string[] = [],
    missingPermissions: string[] = [] // اضافه شد
  ) {
    super(message);
    this.name = 'PermissionError';
    this.code = code;
    this.requiredPermissions = requiredPermissions;
    this.userPermissions = userPermissions;
    this.missingPermissions = missingPermissions; // اضافه شد
    this.timestamp = new Date().toISOString();
  }
}

// تابع کمکی برای parseJWT
const parseJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

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
    return [];
  }
};

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

  return async (context: PermissionContext = {}): Promise<PermissionResult> => {
    const { navigate, user } = context;
    
    try {
      if (!requiredPermissions || requiredPermissions.length === 0) {
        return { 
          granted: true, 
          userPermissions: [], 
          requiredPermissions: [] 
        };
      }

      // 1. دریافت پرمیژن‌های کاربر
      let userPermissions: string[] = [];
      
      if (user?.permissions) {
        userPermissions = user.permissions;
      } else if (permissionResolver) {
        userPermissions = await permissionResolver();
      } else {
        userPermissions = await getPermissionsFromStorage();
      }

      // 2. بررسی اعتبار پرمیژن‌ها
      if (!Array.isArray(userPermissions)) {
        throw new PermissionError(
          'Invalid user permissions format',
          'INVALID_PERMISSIONS_FORMAT',
          requiredPermissions,
          userPermissions as string[],
          [] // missingPermissions خالی
        );
      }

      // 3. اجرای بررسی سفارشی
      if (customCheck) {
        const customResult = await customCheck({
          requiredPermissions,
          userPermissions,
          user,
          context
        });
        
        if (!customResult.granted) {
          throw new PermissionError(
            customResult.message || 'Custom permission check failed',
            'CUSTOM_CHECK_FAILED',
            requiredPermissions,
            userPermissions,
            [] // missingPermissions خالی
          );
        }
      }

      // 4. بررسی پرمیژن‌ها بر اساس mode و محاسبه missingPermissions
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
          missingPermissions = hasPermission ? [] : requiredPermissions;
          break;
          
        case 'none':
          hasPermission = !requiredPermissions.some(perm => 
            userPermissions.includes(perm)
          );
          missingPermissions = hasPermission ? [] : requiredPermissions.filter(perm =>
            userPermissions.includes(perm)
          );
          break;
          
        default:
          hasPermission = requiredPermissions.every(perm => 
            userPermissions.includes(perm)
          );
          missingPermissions = requiredPermissions.filter(perm => 
            !userPermissions.includes(perm)
          );
      }

      // 5. تصمیم‌گیری نهایی
      if (!hasPermission) {
        throw new PermissionError(
          `Insufficient permissions. Required: ${requiredPermissions.join(', ')}. Missing: ${missingPermissions.join(', ')}. You have: ${userPermissions.join(', ')}`,
          'INSUFFICIENT_PERMISSIONS',
          requiredPermissions,
          userPermissions,
          missingPermissions // استفاده از missingPermissions در خطا
        );
      }

      return {
        granted: true,
        userPermissions,
        requiredPermissions,
        missingPermissions // بازگشت missingPermissions حتی در صورت موفقیت
      };

    } catch (error) {
      if (error instanceof PermissionError && redirectOnFail && navigate) {
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
      
      throw error;
    }
  };
};