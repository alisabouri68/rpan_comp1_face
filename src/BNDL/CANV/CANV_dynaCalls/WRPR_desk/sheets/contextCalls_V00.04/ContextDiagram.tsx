import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cast from "./ContextFlow";
import HotContext from "./HotContext";

export default function ContextFlowDiagram() {
  const [contextValue, setContextValue] = useState(0);
  const [flowId, setFlowId] = useState(0);
  const [sending, setSending] = useState(false);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => triggerSend(), 2000);
    return () => clearInterval(t);
  }, [auto]);

  function triggerSend() {
    const next = Math.floor(Math.random() * 100);
    setContextValue(next);
    setFlowId((i) => i + 1);
    setSending(true);
    setTimeout(() => setSending(false), 600);
  }

  return (
    <div>
      <div className="min-h-screen flex items-start justify-center bg-slate-50 dark:bg-gray-800 p-6">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700 ">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              Context Call (React useContext)
            </h2>

            <div className="flex gap-2 items-center">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                Auto update
              </label>
              <button
                onClick={() => setAuto((a) => !a)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  auto
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white dark:bg-slate-700 dark:text-slate-200 text-slate-700 border-slate-300 dark:border-slate-600"
                }`}
              >
                {auto ? "On" : "Off"}
              </button>
              <button
                onClick={triggerSend}
                className="px-3 py-1 rounded-full bg-teal-600 text-white text-sm shadow-sm hover:bg-teal-700"
              >
                Send context
              </button>
              <button
                onClick={() => {
                  setContextValue(0);
                  setFlowId((i) => i + 1);
                }}
                className="px-3 py-1 rounded-full border text-sm dark:border-slate-600 dark:text-slate-200"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Diagram */}
          <div className="relative h-56 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 p-4 overflow-hidden">
            <HotContext.Provider value={contextValue}>
              {/* Hot (Provider) */}
              <div
                className="absolute left-6 top-10 w-40 h-28 rounded-2xl border-2 flex flex-col items-center justify-center"
                style={{ borderColor: sending ? "#14b8a6" : undefined }}
              >
                <motion.div
                  animate={{ scale: sending ? 1.03 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-center p-2"
                >
                  <div className="text-sm text-slate-500 dark:text-slate-300">
                    Hot (Provider)
                  </div>
                  <div className="mt-1 text-xs text-slate-400 dark:text-slate-400">
                    context value
                  </div>
                  <div className="mt-2 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-medium">
                    value:{" "}
                    <span className="text-teal-600 dark:text-teal-400">
                      {contextValue}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Cast (Consumer) */}
              <Cast />
            </HotContext.Provider>

            {/* Arrow SVG */}
            <svg
              className="absolute left-[170px] top-[70px] w-[240px] h-[100px] pointer-events-none"
              viewBox="0 0 240 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad-context" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                id="contextPath"
                d="M10 50 C80 20, 160 20, 230 50"
                stroke="url(#grad-context)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M220 46 L230 50 L220 54"
                stroke="url(#grad-context)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* Moving bubble along path */}
            <AnimatePresence>
              <motion.div
                key={flowId}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  offsetPath: "path('M10 50 C80 20, 160 20, 230 50')",
                  offsetRotate: "0deg",
                }}
                className="absolute left-[170px] top-[70px]"
              >
                <div className="rounded-full px-3 py-1 border shadow-sm bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm flex items-center gap-2 dark:border-slate-600">
                  <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-100">
                    {contextValue}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-300">
                    context
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute left-6 bottom-4 text-xs text-slate-500 dark:text-slate-400">
              <div>
                Click <span className="font-medium">Send context</span> to
                animate a value through Context API.
              </div>
            </div>
          </div>

          {/* Info Panels */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg dark:border-slate-600">
              <div className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
                Explanation
              </div>
              <ol className="text-sm text-slate-600 dark:text-slate-300 list-decimal ml-4 space-y-1">
                <li>
                  Hot component defines a context and provides a value to all
                  children.
                </li>
                <li>
                  Cast component consumes it using <code>useContext</code>.
                </li>
                <li>
                  Changing provider value updates all consumers instantly.
                </li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg dark:border-slate-600">
              <div className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
                How to use
              </div>
              <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc ml-4 space-y-1">
                <li>
                  Replace Prop Drilling with Context to share state globally.
                </li>
                <li>
                  Ideal for theme, language, or global data access across nested
                  components.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
