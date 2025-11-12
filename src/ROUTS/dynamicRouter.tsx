import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RouteObject } from "react-router-dom";
import { DynaMan } from "../ACTR/RACT_dynaMan_V00.04";
import { defaultRoutes } from "./index";

export function DynamicRouter() {
  const [router, setRouter] = useState(() => createBrowserRouter(defaultRoutes));

  useEffect(() => {
    // وقتی برنامه بار اول ران میشه، مقدار پیش‌فرض در DynaMan ذخیره شود
    const existingRoutes = DynaMan.get("ENVI_CONS.routes");

    if (!existingRoutes || existingRoutes.length === 0) {
      DynaMan.set("ENVI_CONS.routes", defaultRoutes);
    }

    // subscribe به تغییرات ENVI_CONS.routes
    const unsub = DynaMan.subscribe((newRoutes) => {
      if (Array.isArray(newRoutes) && newRoutes.length > 0) {
        setRouter(createBrowserRouter(newRoutes as RouteObject[]));
      }
    }, "ENVI_CONS.routes");

    return () => unsub();
  }, []);

  return <RouterProvider router={router} />;
}
