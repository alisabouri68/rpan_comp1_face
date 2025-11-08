// config/middlewareConfig.ts
import { middlewareManager } from "../RPLAY_middlewareManager_V00.04";
import { authMiddleware } from "../RPLAY_authService_V00.04";
import { permissionMiddleware } from "../RPLAY_PermissionCtrl_V00.04";

// ثبت میدلورها با نام
middlewareManager.register(
  "authentication",
  authMiddleware({
    validationEndpoint: "/api/validate-token",
    autoRefresh: true,
  })
);

middlewareManager.register(
  "permission",
  permissionMiddleware([], { checkMode: "every" }) // پرمیژن‌ها بعداً مشخص می‌شوند
);

// میدلورهای قابل استفاده:
// - 'authentication'
// - 'permission'
