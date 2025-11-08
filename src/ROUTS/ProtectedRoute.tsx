// components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { middlewareManager, type ExecutionResult } from '../PLAY/RPLAY_middlewareManager_V00.04';
import PageLoading from '../COMP/RCOMP_pageLoadinng_V00.04';

interface ProtectedRouteProps {
  children: React.ReactNode;
  middlewareNames?: string[];
  middlewares?: Array<(context: any) => Promise<any>>;
  middlewareConfig?: { [key: string]: any };
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  middlewareNames,
  middlewares,
  middlewareConfig = {}
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accessState, setAccessState] = useState<{
    status: 'checking' | 'granted' | 'denied';
    data?: any;
    error?: Error;
  }>({ status: 'checking' });

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const context = { 
          navigate, 
          location,
          ...middlewareConfig 
        };

        let result: ExecutionResult;

        if (middlewareNames && middlewareNames.length > 0) {
          // استفاده از میدلورهای ثبت شده با نام
          result = await middlewareManager.executeByName(middlewareNames, context);
        } else if (middlewares && middlewares.length > 0) {
          // استفاده از میدلورهای مستقیم
          result = await middlewareManager.execute(middlewares, context);
        } else {
          // اگر هیچ میدلوری مشخص نشده، مستقیم عبور می‌کند
          setAccessState({ status: 'granted' });
          return;
        }

        setAccessState({
          status: 'granted',
          data: result.context
        });
      } catch (error) {
        setAccessState({
          status: 'denied',
          error: error as Error
        });
      }
    };

    checkAccess();
  }, [navigate, location, middlewareNames, middlewares, middlewareConfig]);

  if (accessState.status === 'checking') {
    return <PageLoading />;
  }

  if (accessState.status === 'denied') {
    const error = accessState.error as any;
    navigate('/access-denied', {
      replace: true,
      state: {
        reason: error?.code,
        requiredPermissions: error?.requiredPermissions,
        userPermissions: error?.userPermissions,
        missingPermissions: error?.missingPermissions
      }
    });
    return null;
  }

  return <>{children}</>;
};