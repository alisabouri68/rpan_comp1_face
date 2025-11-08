import { Outlet } from "react-router-dom";
import Box_header from "../../BOXS/RBOX_header_V00.04";
import Box_navigation from "../../BOXS/RBOX_navigation_V00.04";

function MobileLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Box_header />

      <div className="flex flex-1 flex-col">
        {/* Main Content - با padding-bottom برای فضای navigation */}
        <div className="flex-1 p-4 w-full pb-20">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm min-h-[calc(100vh-10rem)]">
            <Outlet />
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40">
          <div className="flex justify-around items-center h-16">
            {/* Navigation Items */}
            <button className="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <div className="w-6 h-6 mb-1 bg-gray-400 rounded"></div>
              <span className="text-xs">Home</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <div className="w-6 h-6 mb-1 bg-gray-400 rounded"></div>
              <span className="text-xs">Search</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <div className="w-6 h-6 mb-1 bg-gray-400 rounded"></div>
              <span className="text-xs">Profile</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <div className="w-6 h-6 mb-1 bg-gray-400 rounded"></div>
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileLayout;