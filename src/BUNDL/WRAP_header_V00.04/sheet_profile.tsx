import { useState, useRef, useEffect } from "react";
import { FiEdit3, FiSettings, FiLogOut } from "react-icons/fi";
import Avatar from "../../COMP/RCMP_avatar_VAR.01_V00.04";
import ImageUser from "../../../public/IMG/avatar.png";

export default function IndexUserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    // Add your logout logic here
  };

  const handleLogin = () => {
    // Add your login logic here
  };

  const handleProfileEdit = () => {
    setIsDropdownOpen(false);
    // Add your profile edit logic here
  };

  const handleSettings = () => {
    setIsDropdownOpen(false);
    // Add your settings logic here
  };

  // Static user data - replace with your actual data
  const isLoggedIn = true; // Change based on your auth state
  const user = {
    username: "John Doe",
    email: "john@example.com",
  };

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
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <Avatar
              alt="user"
              variant="single"
              fallbackText=""
              isOnline
              size="md"
              src={ImageUser}
            />
            <div className="flex flex-col items-start">
              <div className="hidden lg:flex">
                <span className="text-gray-900 dark:text-white font-medium">
                  {UserName}
                </span>
              </div>
              <div className="hidden lg:flex">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {user?.email || "User"}
                </span>
              </div>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
              <button
                onClick={handleProfileEdit}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiEdit3 className="ml-2" />
                Edit Profile
              </button>

              <button
                onClick={handleSettings}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiSettings className="ml-2" />
                Settings
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiLogOut className="ml-2" />
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors shadow-sm"
        >
          Login / Sign In
        </button>
      )}
    </div>
  );
}
