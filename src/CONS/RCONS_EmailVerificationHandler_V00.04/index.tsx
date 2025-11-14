import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { Helmet } from "react-helmet-async";

const EmailVerificationHandler: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('لینک تأیید معتبر نیست');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        // موفقیت‌آمیز - ذخیره توکن و کاربر
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        
        setStatus('success');
        setMessage(data.message);

        // ریدایرکت به صفحه اصلی بعد از 2 ثانیه
        setTimeout(() => {
          navigate("/", { 
            state: { message: "Email verified successfully! Welcome!" } 
          });
        }, 2000);

      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'خطا در تأیید ایمیل');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <>
      <Helmet>
        <title>Email Verification</title>
      </Helmet>

      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm text-center">
          
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">در حال تأیید ایمیل...</h2>
              <p className="text-gray-600 dark:text-gray-400">لطفاً کمی صبر کنید</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <HiOutlineCheckCircle className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ایمیل تأیید شد!</h2>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">در حال انتقال به صفحه اصلی...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto h-16 w-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <HiOutlineXCircle className="text-2xl text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">خطا در تأیید ایمیل</h2>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                برگشت به صفحه ورود
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerificationHandler;