import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Sheet_profile from "../../BUNDL/WRAP_header_V00.04/sheet_profile";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-full  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                Logo
              </span>
            </div>
          </div>

          {/* Right side - Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Item 1
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Item 2
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Sheet_profile />
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Item 1
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Item 2
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Item 3
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
