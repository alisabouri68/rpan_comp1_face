// managers/absMan.ts
import { DynaMan } from "../RACT_dynaman_V00.04";

const getEnvVariable = (key: string, fallback: string = ''): string => {
  if (typeof process !== 'undefined' && process.env) {
    return (process.env as any)[key] || fallback;
  }
  return fallback;
};

class AbsMan {
  // مقدار اولیه امن پروفایل
  private initialProfile = {
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      displayName: "",
      isEmailVerified: false,
      createdAt: new Date().toISOString(),
    },
    preferences: {
      theme: "system",
      notifications: true,
      emailNotifications: true,
      newsletter: true
    },
    social: {}
  };

  // مقدار اولیه امن HYB
  private initialHyb = {
    auth: {
      token: "",
      tokenExpiry: new Date().toISOString(),
      loginMethod: ""
    },
    appState: {
      lastLogin: new Date().toISOString(),
      sessionStart: new Date().toISOString(),
      loginCount: 0,
      isVerified: false
    },
    settings: {
      ui: { sidebarCollapsed: false, compactMode: false, fontSize: "medium" },
      privacy: { profileVisible: true, emailVisible: false, activityPublic: true }
    },
    temporary: { draftPosts: [], recentSearches: [], formData: {} }
  };

  constructor() {
    // مقدار اولیه امن رو روی DynaMan ست می‌کنیم
    DynaMan.set("ENVI_profile", this.initialProfile);
    DynaMan.set("ENVI_HYB", this.initialHyb);
    DynaMan.set("environment.API_URL", getEnvVariable('REACT_APP_API_URL', 'http://localhost:3000/api'));
    DynaMan.set("environment.APP_NAME", getEnvVariable('REACT_APP_APP_NAME', 'My App'));
    DynaMan.set("environment.ENVIRONMENT", getEnvVariable('REACT_APP_ENVIRONMENT', 'development'));
  }

  saveUserData(userData: any, token: string): void {
    const userProfile = {
      ...userData,
      displayName: `${userData.firstName} ${userData.lastName}`
    };

    const authData = {
      token,
      tokenExpiry: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
      loginMethod: "email"
    };

    // Merge امن پروفایل
    DynaMan.merge("ENVI_profile", { user: userProfile });
    // Merge امن HYB
    DynaMan.merge("ENVI_HYB", { auth: authData });

    console.log("✅ User data saved via AbsMan");
  }

  updateUserProfile(updates: any) {
    DynaMan.merge("ENVI_profile.user", updates);
  }

  updateSettings(updates: any) {
    DynaMan.merge("ENVI_HYB.settings", updates);
  }

  getProfileEnv() { return DynaMan.get("ENVI_profile"); }
  getHybEnv() { return DynaMan.get("ENVI_HYB"); }
  clearUserData() {
    DynaMan.merge("ENVI_profile", this.initialProfile);
    DynaMan.merge("ENVI_HYB", this.initialHyb);
    window.dispatchEvent(new Event("userLoggedOut"));
  }
}

export const absMan = new AbsMan();
