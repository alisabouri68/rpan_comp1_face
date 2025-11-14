// types/routes.ts
export type ComponentKey =
  | "layout"
  | "home"
  | "hot"
  | "cast"
  | "wiki"
  | "gasma"
  | "login"
  | "register"
  | "verifyEmail"
  | "verifySuccess"
  | "verifyHandler"
  | "accessDenied"
  | "notfound";

export interface SerializableRoute {
  path?: string;               // /, /login, etc.
  index?: boolean;             // index route
  component?: ComponentKey;    // key to map to real element
  handle?: Record<string, any>;
  children?: SerializableRoute[];
  middlewareNames?: string[];  // e.g. ["authentication","permission"]
  middlewareConfig?: Record<string, any>;
}
