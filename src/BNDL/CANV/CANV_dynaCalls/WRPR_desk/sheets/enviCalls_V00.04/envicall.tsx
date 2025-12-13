import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { RootState, AppDispatch } from "RDUX/store";
import { add, selectProfile, ProfileSliceState } from "RDUX/env/ProfileSlice";

// =================================================================
// --- 1. ENVIProfileDiagram Component ---
// =================================================================

export default function ENVIProfileDiagram() {
  const dispatch = useDispatch<AppDispatch>();

  // --- 1a. Read profile state from Redux ---
  const profile = useSelector((state: RootState) => selectProfile(state));

  // --- 1b. Local component states ---
  const [currentAction, setCurrentAction] = useState("");
  const [gettingValue, setGettingValue] = useState(false);
  const [settingValue, setSettingValue] = useState(false);
  const [flowId, setFlowId] = useState(0);
  const [auto, setAuto] = useState(true);
  const [updateCounter, setUpdateCounter] = useState(0);

  // =================================================================
  // --- 2. Auto-update effect ---
  // =================================================================
  useEffect(() => {
    if (!auto) return;

    const interval = setInterval(() => {
      changeAllProfileValues();
    }, 3000);

    return () => clearInterval(interval);
  }, [auto]);

  // =================================================================
  // --- 3. Functions to GET/SET profile ---
  // =================================================================
  const changeAllProfileValues = () => {
    const newProfile: ProfileSliceState = {
      username: `user_${Math.random().toString(36).substring(2, 8)}`,
      displayName: `User ${Math.floor(Math.random() * 1000)}`,
      role: ["admin", "user", "editor", "viewer"][Math.floor(Math.random() * 4)] as ProfileSliceState["role"],
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      lastLogin: new Date().toISOString(),
    };

    setCurrentAction("Changing all profile values...");
    setSettingValue(true);
    setFlowId((id) => id + 1);

    setTimeout(() => {
      dispatch(add(newProfile));
      setSettingValue(false);
      setUpdateCounter((prev) => prev + 1);
    }, 800);
  };

  const triggerGetProfile = () => {
    setCurrentAction("Reading all profile values...");
    setGettingValue(true);
    setFlowId((id) => id + 1);

    setTimeout(() => {
      setGettingValue(false);
    }, 800);
  };

  const triggerSetProfile = () => {
    changeAllProfileValues();
  };

  // =================================================================
  // --- 4. Bubble animation variants ---
  // =================================================================
  const getBubbleVariants: Variants = {
    initial: { opacity: 0, x: 0, y: 0, scale: 0.6 },
    animate: { opacity: 1, x: 220, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.6, transition: { duration: 0.2 } },
  };

  const setBubbleVariants: Variants = {
    initial: { opacity: 0, x: 0, y: 0, scale: 0.6 },
    animate: { opacity: 1, x: -220, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.6, transition: { duration: 0.2 } },
  };

  // =================================================================
  // --- 5. Render ---
  // =================================================================
  return (
    <div className="min-h-screen flex items-start justify-center bg-slate-50 dark:bg-gray-800 p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700 transition-colors duration-500">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Profile — Change All Values
          </h2>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Changes: <span className="font-mono">{updateCounter}</span>
              </div>
              <label className="text-sm text-slate-600 dark:text-slate-300">Auto mode</label>
              <button
                onClick={() => setAuto((a) => !a)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  auto
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white dark:bg-slate-700 dark:text-slate-200 text-slate-700 border-slate-300 dark:border-slate-600"
                }`}
              >
                {auto ? "On" : "Off"}
              </button>
            </div>
            <button
              onClick={triggerGetProfile}
              className="px-3 py-1 rounded-full bg-green-600 text-white text-sm shadow-sm hover:bg-green-700"
            >
              Read Values
            </button>
            <button
              onClick={triggerSetProfile}
              className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm shadow-sm hover:bg-blue-700"
            >
              Change Values
            </button>
          </div>
        </div>

        {/* Status */}
        {auto && (
          <div className="mb-4 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Auto mode active - values change every 3 seconds
          </div>
        )}

        {/* Current Action */}
        {currentAction && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <div className={`w-2 h-2 rounded-full ${gettingValue ? "bg-green-500" : "bg-blue-500"} animate-pulse`} />
              {currentAction}
            </div>
          </div>
        )}

        {/* Current Values Table */}
        <div className="mt-6 p-4 border rounded-lg bg-slate-50 dark:bg-slate-700/50">
          <div className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-200">
            Current Profile Values
          </div>
          <div className="grid grid-cols-2 gap-4">
            {profile ? (
              Object.entries(profile).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded border dark:border-slate-600">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{key}:</span>
                  <span className="text-sm font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{String(value)}</span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-slate-500 dark:text-slate-400 py-4">
                Profile does not exist
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
