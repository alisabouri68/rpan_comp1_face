import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import {
  FiArrowLeft,
  FiLogIn,
  FiHome,
  FiLock,
  FiAlertCircle,
  FiUserX,
} from "react-icons/fi";

  const AccessDenied: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reason, requiredPermissions, userPermissions, missingPermissions } =
    location.state || {};

  const getErrorMessage = () => {
    switch (reason) {
      case "NO_TOKEN":
      case "TOKEN_EXPIRED":
        return "Please log in to your account to access this page.";
      case "INSUFFICIENT_PERMISSIONS":
        return "You do not have the required permissions to view this page.";
      default:
        return "Access to this page has been restricted.";
    }
  };

  const getErrorTitle = () => {
    switch (reason) {
      case "NO_TOKEN":
      case "TOKEN_EXPIRED":
        return "Authentication Required";
      case "INSUFFICIENT_PERMISSIONS":
        return "Access Denied";
      default:
        return "Restricted Access";
    }
  };

  const getErrorIcon = () => {
    switch (reason) {
      case "NO_TOKEN":
      case "TOKEN_EXPIRED":
        return <FiUserX className="w-12 h-12 text-red-500" />;
      case "INSUFFICIENT_PERMISSIONS":
        return <FiLock className="w-12 h-12 text-red-500" />;
      default:
        return <FiAlertCircle className="w-12 h-12 text-red-500" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-red-200 rounded-full flex items-center justify-center dark:border-red-800">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center dark:bg-red-600">
                {getErrorIcon()}
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-white dark:border-gray-800"></div>
          </div>
        </div>

        {/* Title and Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            {getErrorTitle()}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {getErrorMessage()}
          </p>
        </div>

        {/* Permission Details */}
        {reason === "INSUFFICIENT_PERMISSIONS" && (
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Permission Details
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                  Required Permissions
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {requiredPermissions?.map((perm: string) => (
                    <span
                      key={perm}
                      className="px-3 py-2 bg-blue-100 text-blue-800 text-sm rounded-lg border border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 break-words max-w-full"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                  Your Permissions
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {userPermissions?.map((perm: string) => (
                    <span
                      key={perm}
                      className="px-3 py-2 bg-green-100 text-green-800 text-sm rounded-lg border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 break-words max-w-full"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              {missingPermissions && missingPermissions.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-3 text-center">
                    Missing Permissions
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {missingPermissions.map((perm: string) => (
                      <span
                        key={perm}
                        className="px-3 py-2 bg-red-100 text-red-800 text-sm rounded-lg border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700 break-words max-w-full"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons - Stacked Layout */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-4 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-3 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <FiArrowLeft className="w-5 h-5 flex-shrink-0" />
            <span className="text-base">Go Back to Previous Page</span>
          </button>

          {(reason === "NO_TOKEN" || reason === "TOKEN_EXPIRED") && (
            <button
              onClick={() => navigate("/login")}
              className="w-full px-6 py-4 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-3 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              <FiLogIn className="w-5 h-5 flex-shrink-0" />
              <span className="text-base">Sign In to Your Account</span>
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-medium hover:from-gray-800 hover:to-gray-900 transition-all duration-200 flex items-center justify-center gap-3 dark:from-gray-600 dark:to-gray-700 dark:hover:from-gray-500 dark:hover:to-gray-600"
          >
            <FiHome className="w-5 h-5 flex-shrink-0" />
            <span className="text-base">Return to Home Page</span>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you believe this is an error, please contact our support team for
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AccessDenied;