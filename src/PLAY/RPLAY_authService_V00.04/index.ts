// middlewares/authMiddleware.ts

export interface AuthMiddlewareOptions {
  tokenKey?: string;
  refreshTokenKey?: string;
  autoRefresh?: boolean;
  redirectOnFail?: boolean;
  validationEndpoint?: string | null;
}

export interface AuthContext {
  navigate?: (path: string, options?: any) => void;
  location?: {
    pathname: string;
    search?: string;
    hash?: string;
  };
}

export interface TokenPayload {
  sub?: string;
  email?: string;
  roles?: string[];
  permissions?: string[];
  exp?: number;
  iat?: number;
}

export interface AuthResult {
  user: {
    id?: string;
    email?: string;
    roles: string[];
    permissions: string[];
  };
  token: string;
}

class AuthenticationError extends Error {
  public code: string;
  public redirectTo: string;
  public timestamp: string;

  constructor(message: string, code: string, redirectTo: string = '/login') {
    super(message);
    this.name = 'AuthenticationError';
    this.code = code;
    this.redirectTo = redirectTo;
    this.timestamp = new Date().toISOString();
  }
}

// توابع کمکی با تایپ
const parseJWT = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as TokenPayload;
  } catch {
    return null;
  }
};

const isTokenExpired = (tokenPayload: TokenPayload): boolean => {
  if (!tokenPayload.exp) return false;
  return Date.now() >= tokenPayload.exp * 1000;
};

const handleTokenRefresh = async (
  tokenKey: string, 
  refreshTokenKey: string, 
  endpoint: string | null
): Promise<void> => {
  if (!endpoint) {
    throw new Error('No refresh endpoint provided');
  }

  const refreshToken = localStorage.getItem(refreshTokenKey);
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken })
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const data = await response.json();
  const { token, refreshToken: newRefreshToken } = data;

  if (token) {
    localStorage.setItem(tokenKey, token);
  }
  if (newRefreshToken) {
    localStorage.setItem(refreshTokenKey, newRefreshToken);
  }
};

const validateTokenWithServer = async (
  token: string, 
  endpoint: string
): Promise<boolean> => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const authMiddleware = (options: AuthMiddlewareOptions = {}) => {
  const {
    tokenKey = 'auth_token',
    refreshTokenKey = 'refresh_token',
    autoRefresh = true,
    redirectOnFail = true,
    validationEndpoint = null
  } = options;

  return async (context: AuthContext = {}): Promise<AuthResult> => {
    const { navigate, location } = context;
    
    try {
      // 1. بررسی وجود توکن
      const token = localStorage.getItem(tokenKey);
      const refreshToken = localStorage.getItem(refreshTokenKey);

      if (!token) {
        throw new AuthenticationError(
          'No authentication token found',
          'NO_TOKEN'
        );
      }

      // 2. بررسی اعتبار توکن
      const tokenPayload = parseJWT(token);
      if (!tokenPayload) {
        throw new AuthenticationError(
          'Invalid token format',
          'INVALID_TOKEN_FORMAT'
        );
      }

      // 3. بررسی انقضای توکن
      if (isTokenExpired(tokenPayload)) {
        if (autoRefresh && refreshToken) {
          try {
            await handleTokenRefresh(tokenKey, refreshTokenKey, validationEndpoint);
          } catch (refreshError) {
            throw new AuthenticationError(
              'Token refresh failed',
              'REFRESH_FAILED'
            );
          }
        } else {
          throw new AuthenticationError(
            'Token has expired',
            'TOKEN_EXPIRED'
          );
        }
      }

      // 4. بررسی اعتبار توکن با سرور
      if (validationEndpoint) {
        const isValid = await validateTokenWithServer(token, validationEndpoint);
        if (!isValid) {
          throw new AuthenticationError(
            'Token validation failed',
            'SERVER_VALIDATION_FAILED'
          );
        }
      }

      // 5. بازگشت اطلاعات کاربر
      return {
        user: {
          id: tokenPayload.sub,
          email: tokenPayload.email,
          roles: tokenPayload.roles || [],
          permissions: tokenPayload.permissions || []
        },
        token: token
      };

    } catch (error) {
      // پاک کردن توکن‌های نامعتبر
      if (error instanceof AuthenticationError) {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshTokenKey);
        
        if (redirectOnFail && navigate && location) {
          const redirectPath = `${error.redirectTo}?redirect=${encodeURIComponent(location.pathname || '/')}&reason=${error.code}`;
          navigate(redirectPath, { replace: true });
        }
      }
      
      throw error;
    }
  };
};