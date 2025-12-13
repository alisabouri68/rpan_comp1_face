import { lazy } from "react";
import pic from "Asset/images/unnamed.png";

export default {
    layoutName:"mono",
  serviceName: "Splash",
  slug: "splash",
  color: "bg-red-300",
  order: 8,
  sheets: [
    {
      sheetName: "Splash",
      slug: "Splash",
      jini:pic,
      component: lazy(() => import("./sheets/enviMng")),
      auxiliary: lazy(() => import("./sheets/enviMng/assistance")),
      order: 6,
      color: "bg-red-300",
    },
  ],
};
