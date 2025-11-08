import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit3, FiSettings, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { HiOutlineUserCircle, HiOutlineCog, HiOutlinePencilAlt } from "react-icons/hi";

export default function IndexUserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // React Router navigation

  const toggleDropdown = () => {
    if (isLoggedIn) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsLoggedIn(false); // Logout user
    console.log("Logging out...");
    // Optionally navigate to home after logout
    // navigate('/');
  };

  const handleLogin = () => {
    // Navigate to login page instead of setting state directly
    navigate('/login');
    console.log("Redirecting to login...");
  };

  const handleRegister = () => {
    // Navigate to register page
    navigate('/register');
    console.log("Redirecting to register...");
  };

  const handleProfileEdit = () => {
    setIsDropdownOpen(false);
    // Navigate to profile edit page
    navigate('/profile/edit');
    console.log("Editing profile...");
  };

  const handleSettings = () => {
    setIsDropdownOpen(false);
    // Navigate to settings page
    navigate('/settings');
    console.log("Opening settings...");
  };

  // User data - would come from your auth context/API in real app
  const user = isLoggedIn ? {
    username: "John Doe",
    email: "john@example.com",
  } : null;

  const UserName = user?.username || "Unknown";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-2 relative" ref={dropdownRef}>
      {isLoggedIn ? (
        <>
          {/* User Profile with Icon */}
          <div
            className="flex gap-3 items-center cursor-pointer p-2 rounded-lg"
            onClick={toggleDropdown}
          >
            {/* Avatar Icon Container */}
            <div className="relative">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-sm">
                <HiOutlineUserCircle className="w-6 h-6" />
              </div>
              {/* Online Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-start">
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">
                  {UserName}
                </span>
                <FiChevronDown className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              <div className="hidden lg:flex">
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {user?.email || "User"}
                </span>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-600">
              {/* User Summary */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <HiOutlineUserCircle className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {UserName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={handleProfileEdit}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <HiOutlinePencilAlt className="ml-3 text-gray-500" />
                  Edit Profile
                </button>

                <button
                  onClick={handleSettings}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <HiOutlineCog className="ml-3 text-gray-500" />
                  Settings
                </button>
              </div>

              {/* Logout Section */}
              <div className="border-t border-gray-100 dark:border-gray-600 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <FiLogOut className="ml-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Login/Register Buttons */
        <div className="flex gap-2">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <FiUser className="w-4 h-4" />
            Login
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-300 dark:border-gray-600 flex items-center gap-2"
          >
            <HiOutlineUserCircle className="w-4 h-4" />
            Register
          </button>
        </div>
      )}
    </div>
  );
}