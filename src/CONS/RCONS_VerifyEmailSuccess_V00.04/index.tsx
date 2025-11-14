// components/VerifySuccess.tsx
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineMail } from "react-icons/hi";
import { Helmet } from "react-helmet-async";

const VerifySuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState("");
  const hasVerified = useRef(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Check if user is already verified
    const existingToken = localStorage.getItem("auth_token");
    const existingUser = localStorage.getItem("user");
    
    if (existingToken && existingUser) {
      console.log('✅ User already verified, redirecting...');
      setStatus('success');
      setMessage('Your email has already been verified');
      return;
    }

    if (hasVerified.current) return;
    
    const token = searchParams.get('token');
    console.log('🔐 Token from URL:', token);

    if (!token) {
      setStatus('error');
      setMessage('Verification link is not valid');
      return;
    }

    const verifyEmail = async () => {
      try {
        hasVerified.current = true;
        console.log('🚀 Starting verification process...');
        
        const response = await fetch(`http://localhost:3000/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        console.log('📡 API Response status:', response.status);
        console.log('📡 API Response data:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        // Check response structure and extract user data
        const userData = data.user || data.data;
        const authToken = data.token;

        if (!authToken || !userData) {
          throw new Error('Received incomplete data from server');
        }

        console.log('💾 Saving to localStorage...');
        
        // Save to localStorage
        localStorage.setItem("auth_token", authToken);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Verify saving
        const savedToken = localStorage.getItem("auth_token");
        const savedUser = localStorage.getItem("user");
        
        console.log('✅ Token saved:', !!savedToken);
        console.log('✅ User saved:', !!savedUser);
        
        if (!savedToken || !savedUser) {
          throw new Error('Failed to save user information');
        }

        setStatus('success');
        setMessage(data.message || 'Your email has been successfully verified!');

      } catch (error: any) {
        console.error('❌ Verification error:', error);
        setStatus('error');
        setMessage(error.message || 'An unknown error occurred');
        
        // Clear old data on error
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  // Countdown timer for redirect
  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            console.log('🎯 Redirecting to /');
            window.location.href = '/';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status]);

  const handleManualRedirect = () => {
    console.log('🎯 Manual redirect to /');
    window.location.href = '/';
  };

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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verifying Email...</h2>
              <p className="text-gray-600 dark:text-gray-400">Please wait</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <HiOutlineCheckCircle className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Success!</h2>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <HiOutlineCheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-700 dark:text-green-300">
                    You will be automatically redirected to the main page...
                  </span>
                </div>
                <div className="mt-2 text-lg font-semibold text-green-600 dark:text-green-400">
                  {countdown} seconds
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  onClick={handleManualRedirect}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Go to Main Page
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                >
                  Go to Login
                </button>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto h-16 w-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <HiOutlineXCircle className="text-2xl text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Error</h2>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <HiOutlineMail className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-700 dark:text-red-300">
                    You can try again if there's a problem
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  New Registration
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifySuccess;