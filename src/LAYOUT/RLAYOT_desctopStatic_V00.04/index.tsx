import { Outlet } from "react-router-dom";
import Box_header from "../../BOXS/RBOX_header_V00.04";
import Box_navigation from "../../BOXS/RBOX_navigation_V00.04";

function DesktopLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Box_header />

      <div className="flex flex-1">
        <div className="w-20 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
          <Box_navigation />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3">
          <div className="flex h-full gap-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopLayout;