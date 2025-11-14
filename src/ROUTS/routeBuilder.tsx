import React, { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import PageLoading from "../COMP/RCOMP_pageLoadinng_V00.04";
import type { SerializableRoute } from "./types";

// --- Lazy imports ---
const LayoutCtrl = React.lazy(() => import("../PLAY/RPLAY_layoutCtrl_V00.04/index"));
const Home = React.lazy(() => import("../CONS/RCONS_home_V00.04"));
const Hot = React.lazy(() => import("../CONS/RCONS_hot_V00.04"));
const Cast = React.lazy(() => import("../CONS/RCONS_cast_V00.04"));
const Wiki = React.lazy(() => import("../CONS/RCONS_wiki_V00.04"));
const Gasma = React.lazy(() => import("../CONS/RCONS_gasma_V00.04"));
const Login = React.lazy(() => import("../CONS/RCONS_login_V00.04"));
const Rejistery = React.lazy(() => import("../CONS/RCONS_register_V00.04"));
const Notfound = React.lazy(() => import("../CONS/RCONS_notfound_V00.04"));
const VerifyEmail = React.lazy(() => import("../CONS/RCONS_EmailVerificationPage_V00.04"));
const EmailVerificationHandler = React.lazy(() => import("../CONS/RCONS_EmailVerificationHandler_V00.04"));
const VerifyEmailSuccess = React.lazy(() => import("../CONS/RCONS_VerifyEmailSuccess_V00.04"));
const AccessDenied = React.lazy(() => import("../CONS/RCONS_accessDenied_V00.04"));

// Suspense wrapper
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoading />}>{children}</Suspense>
);

// resolve component key به JSX واقعی
function resolveComponentByKey(key?: string): React.ReactNode | null {
  switch (key) {
    case "layout": return <LayoutCtrl />;
    case "home": return <Home />;
    case "hot": return <Hot />;
    case "cast": return <Cast />;
    case "wiki": return <Wiki />;
    case "gasma": return <Gasma />;
    case "login": return <Login />;
    case "register": return <Rejistery />;
    case "verifyEmail": return <VerifyEmail />;
    case "verifyHandler": return <EmailVerificationHandler />;
    case "verifySuccess": return <VerifyEmailSuccess />;
    case "accessDenied": return <AccessDenied />;
    case "notfound": return <Notfound />;
    default: return null;
  }
}

// تبدیل metadata به RouteObject
export function buildRoutes(config: SerializableRoute[]): RouteObject[] {
  if (!Array.isArray(config) || config.length === 0) return [];

  return config.map((r) => {
    const children = r.children ? buildRoutes(r.children) : undefined;
    const resolved = resolveComponentByKey(r.component);

    let element: React.ReactNode | undefined;
    if (resolved) {
      element = r.middlewareNames?.length ? (
        <ProtectedRoute
          middlewareNames={r.middlewareNames}
          middlewareConfig={r.middlewareConfig}
        >
          <SuspenseWrapper>{resolved}</SuspenseWrapper>
        </ProtectedRoute>
      ) : (
        <SuspenseWrapper>{resolved}</SuspenseWrapper>
      );
    }

    if (r.index) {
      return { index: true, element, children, handle: r.handle } as RouteObject;
    } else {
      return { path: r.path, index: false, element, children, handle: r.handle } as RouteObject;
    }
  });
}
