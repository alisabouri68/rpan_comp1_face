import { useEffect, useState, type ReactNode } from "react";
import { absMan } from "../../ACTR/RACT_absman_V00.04";
import { DynaMan } from "../../ACTR/RACT_dynaman_V00.04";

interface EnvironmentProviderProps { children: ReactNode }

export default function EnvironmentProvider({ children }: EnvironmentProviderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token") || "";
    
    console.log("🔍 EnvironmentProvider started");
    console.log("📝 Token exists:", !!token);
    console.log("📝 Token value:", token ? `${token.substring(0, 10)}...` : "empty");
    console.log("📝 Current ENVI_profile:", DynaMan.get("ENVI_profile"));
    console.log("📝 Current ENVI_HYB:", DynaMan.get("ENVI_HYB"));

    if (!token) {
      console.log("❌ No token found - using default environments");
      setLoading(false);
      return;
    }

    async function loadEnvironments() {
      try {
        // دریافت API_URL از DynaMan
        const API_URL = DynaMan.get("environment.API_URL") || "http://localhost:3000/api";
        console.log("🔄 API_URL:", API_URL);
        
        // اصلاح URL‌ها - باید به /api/auth/profile و /api/auth/hyb اشاره کنند
        const profileUrl = `${API_URL}/auth/profile`;
        const hybUrl = `${API_URL}/auth/hyb`;
        
        console.log("📡 Fetching from URLs:", { profileUrl, hybUrl });

        const [hybRes, profileRes] = await Promise.all([
          fetch(hybUrl, { 
            headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            } 
          }),
          fetch(profileUrl, { 
            headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            } 
          }),
        ]);

        console.log("📄 Response Status - Profile:", profileRes.status, profileRes.statusText);
        console.log("📄 Response Status - HYB:", hybRes.status, hybRes.statusText);

        // بررسی وضعیت پاسخ‌ها
        if (!profileRes.ok) {
          console.error("❌ Profile fetch failed:", profileRes.status, profileRes.statusText);
          throw new Error(`Profile fetch failed: ${profileRes.status}`);
        }

        if (!hybRes.ok) {
          console.error("❌ HYB fetch failed:", hybRes.status, hybRes.statusText);
          throw new Error(`HYB fetch failed: ${hybRes.status}`);
        }

        const profileData = await profileRes.json();
        const hybData = await hybRes.json();

        console.log("📦 Profile API Response:", profileData);
        console.log("📦 HYB API Response:", hybData);

        // بررسی ساختار داده‌های دریافتی
        if (!profileData.success) {
          console.error("❌ Profile API returned error:", profileData.error);
          throw new Error("Profile API returned error: " + (profileData.error || "Unknown error"));
        }

        if (!hybData.success) {
          console.error("❌ HYB API returned error:", hybData.error);
          throw new Error("HYB API returned error: " + (hybData.error || "Unknown error"));
        }

        console.log("💾 Saving user data to absMan...");
        console.log("💾 Profile data to save:", profileData.data);
        
        // استفاده از absMan برای ذخیره داده کاربر
        absMan.saveUserData(profileData.data, token);
        
        console.log("✅ After absMan.saveUserData - ENVI_profile:", DynaMan.get("ENVI_profile"));

        // بروزرسانی تنظیمات HYB
        if (hybData.data && hybData.data.settings) {
          console.log("⚙️ Merging HYB settings:", hybData.data.settings);
          DynaMan.merge("ENVI_HYB.settings", hybData.data.settings);
        }

        // بروزرسانی سایر داده‌های HYB
        if (hybData.data && hybData.data.appState) {
          console.log("🔄 Merging HYB appState:", hybData.data.appState);
          DynaMan.merge("ENVI_HYB.appState", hybData.data.appState);
        }

        console.log("✅ Environments loaded successfully");
        console.log("🎉 Final ENVI_profile:", DynaMan.get("ENVI_profile"));
        console.log("🎉 Final ENVI_HYB:", DynaMan.get("ENVI_HYB"));
        
      } catch (err: any) {
        console.error("💥 Failed to load environments:", err);
        console.error("📄 Error details:", err.message);
        
        // در صورت خطا، سعی می‌کنیم با داده‌های پایه کار کنیم
        console.log("🔄 Trying to use basic user data from token...");
        try {
          // اگر token معتبر است، می‌توانیم اطلاعات پایه را استخراج کنیم
          if (token && token.split('.').length === 3) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log("🔐 Token payload:", payload);
            
            const basicUserData = {
              id: payload.userId,
              firstName: "",
              lastName: "",
              email: "",
              isEmailVerified: false,
              createdAt: new Date().toISOString()
            };
            
            absMan.saveUserData(basicUserData, token);
            console.log("🔄 Created basic user data from token");
          }
        } catch (tokenError) {
          console.error("❌ Failed to create basic user data:", tokenError);
        }
      } finally {
        setLoading(false);
      }
    }

    loadEnvironments();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading environments...</p>
      </div>
    </div>
  );
  
  return <>{children}</>;
}