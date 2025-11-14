import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoading from "../COMP/RCOMP_pageLoadinng_V00.04";

// Lazy imports
const Home = lazy(() => import("../CONS/RCONS_home_V00.04"));
const Hot = lazy(() => import("../CONS/RCONS_hot_V00.04"));
const Cast = lazy(() => import("../CONS/RCONS_cast_V00.04"));
const Wiki = lazy(() => import("../CONS/RCONS_wiki_V00.04"));
const Gasma = lazy(() => import("../CONS/RCONS_gasma_V00.04"));
const Login = lazy(() => import("../CONS/RCONS_login_V00.04"));
const Rejistery = lazy(() => import("../CONS/RCONS_register_V00.04"));
const Notfound = lazy(() => import("../CONS/RCONS_notfound_V00.04"));
const LayoutCtrl = lazy(() => import("../PLAY/RPLAY_layoutCtrl_V00.04/index"));

// Middleware imports
import { middlewareManager } from "../PLAY/RPLAY_middlewareManager_V00.04";
import { authMiddleware } from "../PLAY/RPLAY_authService_V00.04";
import { permissionMiddleware } from "../PLAY/RPLAY_PermissionCtrl_V00.04";
import { ProtectedRoute } from "./ProtectedRoute";
import { AccessDenied } from "../CONS/RCONS_accessDenied_V00.04";
import VerifyEmail from "../CONS/RCONS_EmailVerificationPage_V00.04";
import EmailVerificationHandler from "../CONS/RCONS_EmailVerificationHandler_V00.04";
import VerifyEmailSuccess from "../CONS/RCONS_VerifyEmailSuccess_V00.04";

// Register middlewares
middlewareManager.register(
  "authentication",
  authMiddleware({
    validationEndpoint: "/api/validate-token",
    autoRefresh: true,
  })
);

middlewareManager.register(
  "permission",
  permissionMiddleware([], { checkMode: "every" })
);

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoading />}>{children}</Suspense>
);

export const defaultRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <LayoutCtrl />
      </SuspenseWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
        handle: { layout: "static" },
      },
      {
        path: "hot",
        element: (
          <SuspenseWrapper>
            <Hot />
          </SuspenseWrapper>
        ),
        handle: { layout: "deep" },
      },
      {
        path: "cast",
        element: (
          <ProtectedRoute
            middlewareNames={["authentication", "permission"]}
            middlewareConfig={{
              permission: { requiredPermissions: ["cast.read"] },
            }}
          >
            <SuspenseWrapper>
              <Cast />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
        handle: { layout: "deep" },
      },
      {
        path: "wiki",
        element: (
          <ProtectedRoute
            middlewareNames={["authentication", "permission"]}
            middlewareConfig={{
              permission: { requiredPermissions: ["wiki.read", "wiki.write"] },
            }}
          >
            <SuspenseWrapper>
              <Wiki />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
        handle: { layout: "deep" },
      },
      {
        path: "gasma",
        element: (
          <ProtectedRoute middlewareNames={["authentication"]}>
            <SuspenseWrapper>
              <Gasma />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
        handle: { layout: "deep" },
      },
      {
        path: "/login",
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
        handle: { layout: "mono" },
      },
      {
        path: "/register",
        element: (
          <SuspenseWrapper>
            <Rejistery />
          </SuspenseWrapper>
        ),
        handle: { layout: "mono" },
      },
      {
        path: "/verify-email",
        element: (
          <SuspenseWrapper>
            <VerifyEmail />
          </SuspenseWrapper>
        ),
        handle: { layout: "mono" },
      },
         {
        path: "/verify-success",
        element: (
          <SuspenseWrapper>
           <VerifyEmailSuccess />
          </SuspenseWrapper>
        ),
        handle: { layout: "mono" },
      },
            {
        path: "/verify-email-handler",
        element: (
          <SuspenseWrapper>
           <EmailVerificationHandler />
          </SuspenseWrapper>
        ),
        handle: { layout: "mono" },
      },
      {
        path: "/access-denied",
        element: (
          <SuspenseWrapper>
            <AccessDenied />
          </SuspenseWrapper>
        ),
        handle: { layout: "mono" },
      },
      {
        path: "*",
        element: (
          <SuspenseWrapper>
            <Notfound />
          </SuspenseWrapper>
        ),
        handle: { layout: "static" },
      },
    ],
  },
];
