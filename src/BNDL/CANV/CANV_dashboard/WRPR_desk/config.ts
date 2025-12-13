import { lazy } from "react";
import pic from "Asset/images/Capture1.jpg"
export default {
        layoutName:"mono",
  serviceName: "Dashboard",
  slug: "dashboard",
  color: "bg-gray-100",
  order: 1,
  // component: lazy(() => import("./index")),
  sheets: [

    {
      sheetName: "Last History",
      slug: "last_history",
      jini:pic,
      component: lazy(() => import("./sheets/last-history")),
      order: 1,
    },
    {
      sheetName: "Test Page",
      slug: "test",
      jini:pic,
      component: lazy(() => import("./sheets/test")),
      order: 2,
    },
  ],
};
