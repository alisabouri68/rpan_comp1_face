import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { HiOutlineUserCircle, HiOutlineCog, HiOutlinePencilAlt } from "react-icons/hi";

export default function IndexUserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check if user is logged in on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("auth_token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Check immediately
    checkAuthStatus();

    // Listen for storage changes (from other tabs/windows)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    // Listen for custom login event (from other components)
    const handleLoginEvent = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userLoggedIn", handleLoginEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoggedIn", handleLoginEvent);
    };
  }, []);

  const toggleDropdown = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    
    // Reset state
    setUser(null);
    setIsDropdownOpen(false);
    
    // Dispatch event for other components
    window.dispatchEvent(new Event("userLoggedOut"));
    
    console.log("User logged out successfully");
    
    // Optionally navigate to home
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleProfileEdit = () => {
    setIsDropdownOpen(false);
    navigate('/profile/edit');
  };

  const handleSettings = () => {
    setIsDropdownOpen(false);
    navigate('/settings');
  };

  const handleDashboard = () => {
    setIsDropdownOpen(false);
    navigate('/dashboard');
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "Guest";
    
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.username) {
      return user.username;
    } else if (user.email) {
      return user.email.split('@')[0];
    }
    
    return "User";
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map((n:any) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-2 relative" ref={dropdownRef}>
      {user ? (
        <>
          {/* User Profile - Logged In State */}
          <div
            className="flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            onClick={toggleDropdown}
          >
            {/* Avatar with Initials */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-md">
                {getUserInitials()}
              </div>
              {/* Online Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>

            {/* User Info - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-200 font-medium text-sm max-w-[120px] truncate">
                  {getUserDisplayName()}
                </span>
                <FiChevronDown 
                  className={`text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </div>
              <div className="flex">
                <span className="text-gray-500 dark:text-gray-400 text-xs max-w-[140px] truncate">
                  {user.email || "Member"}
                </span>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              {/* User Summary */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {getUserInitials()}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {getUserDisplayName()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={handleDashboard}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 group"
                >
                  <HiOutlineUserCircle className="w-4 h-4 mr-3 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  Dashboard
                </button>

                <button
                  onClick={handleProfileEdit}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 group"
                >
                  <HiOutlinePencilAlt className="w-4 h-4 mr-3 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  Edit Profile
                </button>

                <button
                  onClick={handleSettings}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 group"
                >
                  <HiOutlineCog className="w-4 h-4 mr-3 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  Settings
                </button>
              </div>

              {/* Logout Section */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                >
                  <FiLogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Login/Register Buttons - Logged Out State */
        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 border border-gray-700 dark:border-gray-600"
          >
            <FiUser className="w-4 h-4" />
            <span className="hidden sm:inline">Login</span>
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-300 dark:border-gray-600 flex items-center gap-2"
          >
            <HiOutlineUserCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Register</span>
          </button>
        </div>
      )}
    </div>
  );
}