import React from "react";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { DynaMan } from "../ACTR/RACT_dynaman_V00.04/index";
import { defaultRouteConfig } from "./routConfig";
import { buildRoutes } from "./routeBuilder";

export function DynamicRouter() {
  const [config, setConfig] = React.useState(defaultRouteConfig);

  // subscribe به تغییرات DynaMan
  React.useEffect(() => {
    const existing = DynaMan.get("ENVI_CONS");
    if (!existing || !Array.isArray(existing) || existing.length === 0) {
      DynaMan.set("ENVI_CONS", defaultRouteConfig);
      setConfig(defaultRouteConfig);
    } else {
      setConfig(existing);
    }

    const unsub = DynaMan.subscribe((newConfig) => {
      if (Array.isArray(newConfig) && newConfig.length > 0) {
        setConfig(newConfig);
      }
    }, "ENVI_CONS");

    return () => unsub();
  }, []);

  const routes: RouteObject[] = React.useMemo(() => buildRoutes(config), [config]);

  if (!routes || routes.length === 0) return <div>Loading routes...</div>;

  const router = React.useMemo(() => createBrowserRouter(routes), [routes]);

  return <RouterProvider router={router} />;
}
