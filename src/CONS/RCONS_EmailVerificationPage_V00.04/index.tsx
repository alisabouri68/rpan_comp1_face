// components/EmailVerificationPage.tsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HiOutlineMail, HiOutlineCheckCircle } from "react-icons/hi";
import { Helmet } from "react-helmet-async";

const EmailVerificationPage: React.FC = () => {
  const location = useLocation();
  const { email, fromLogin = false } = location.state || {};

  return (
    <>
      <Helmet>
        <title>Email Verification Required</title>
      </Helmet>

      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm text-center">
          <div className="mx-auto h-16 w-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
            <HiOutlineMail className="text-2xl text-yellow-600 dark:text-yellow-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Email Verification Required
          </h2>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              {fromLogin
                ? "Before you can access your account, you need to verify your email address."
                : "Thank you for registering! Please verify your email address to continue."}
            </p>
            {email && (
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verification email sent to:
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {email}
                </p>
              </div>
            )}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-left">
              <div className="flex items-start space-x-3">
                <HiOutlineCheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-300">
                    What to do next:
                  </h4>
                  <ul className="mt-2 text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Check your email inbox</li>
                    <li>• Click the verification link in the email</li>
                    <li>• Return here and try logging in again</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Link
                to="/login"
                className="block w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Return to Login
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                I've verified my email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationPage;