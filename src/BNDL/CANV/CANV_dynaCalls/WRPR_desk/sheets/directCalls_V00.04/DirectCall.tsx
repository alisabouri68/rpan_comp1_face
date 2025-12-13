import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export default function ParentChildDiagram() {
  const [propValue, setPropValue] = useState(0);
  const [sending, setSending] = useState(false);
  const [flowId, setFlowId] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      triggerSend();
    }, 1800);
    return () => clearInterval(t);
  }, [auto]);

  function triggerSend() {
    const next = Math.floor(Math.random() * 100);
    setPropValue(next);
    setFlowId((id) => id + 1);
    setSending(true);
    setTimeout(() => setSending(false), 600);
  }

  const bubbleVariants: Variants = {
    initial: { opacity: 0, x: 0, y: 0, scale: 0.6 },
    animate: {
      opacity: 1,
      x: 220,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      transition: { duration: 0.25 },
    },
  };

  return (
    <div>
      <div className="min-h-screen flex items-start justify-center bg-slate-50 p-6 transition-colors duration-500">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 border border-slate-100 transition-colors duration-500">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              Direct call (Parent → Child Prop flow)
            </h2>

            <div className="flex gap-2 items-center">
              <label className="text-sm text-slate-600">
                Auto send
              </label>
              <button
                onClick={() => setAuto((a) => !a)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  auto
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                {auto ? "On" : "Off"}
              </button>
              <button
                onClick={triggerSend}
                className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm shadow-sm hover:bg-indigo-700"
              >
                Send prop
              </button>
              <button
                onClick={() => {
                  setPropValue(0);
                  setFlowId((i) => i + 1);
                }}
                className="px-3 py-1 rounded-full border text-sm border-slate-300 text-slate-700"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Diagram */}
          <div className="relative h-56 bg-gradient-to-b from-white to-slate-50 rounded-lg border border-slate-100 p-4 overflow-hidden transition-colors">
            {/* Parent */}
            <div
              className="absolute left-6 top-10 w-40 h-28 rounded-2xl border-2 flex flex-col items-center justify-center transition-colors"
              style={{ borderColor: sending ? "#7c3aed" : undefined }}
            >
              <motion.div
                animate={{ scale: sending ? 1.03 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center p-2"
              >
                <div className="text-sm text-slate-500">
                  Parent Component
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  state / props
                </div>
                <div className="mt-2 px-2 py-1 bg-slate-100 rounded-full text-sm font-medium">
                  value:{" "}
                  <span className="text-indigo-600">
                    {propValue}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Child */}
            <div className="absolute right-6 top-10 w-40 h-28 rounded-2xl border-2 flex flex-col items-center justify-center border-slate-300">
              <div className="text-sm text-slate-500">
                Child Component
              </div>
              <div className="mt-1 text-xs text-slate-400">
                receive prop
              </div>
              <motion.div
                key={propValue}
                initial={{ opacity: 0.6, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-2 px-2 py-1 bg-emerald-50 rounded-full text-sm font-medium border border-emerald-700"
              >
                <span className="text-emerald-700">
                  prop: {propValue}
                </span>
              </motion.div>
            </div>

            {/* Arrow */}
            <svg
              className="absolute left-44 top-22 w-48 h-20 pointer-events-none"
              viewBox="0 0 220 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M10 40 C70 10, 150 10, 210 40"
                stroke="url(#g1)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M200 36 L210 40 L200 44"
                stroke="url(#g1)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* Animated bubble */}
            <div className="absolute left-44 top-8 w-52 h-32 pointer-events-none">
              <AnimatePresence>
                <motion.div
                  key={flowId}
                  variants={bubbleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 top-8 rounded-full px-3 py-1 border shadow-sm bg-white/90 backdrop-blur-sm flex items-center gap-2 border-slate-300"
                >
                  <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                  <div className="text-sm font-medium text-slate-700">
                    {propValue}
                  </div>
                  <div className="text-xs text-slate-400">
                    prop
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="absolute left-6 bottom-4 text-xs text-slate-500">
              <div>
                Click <span className="font-medium">Send prop</span> to animate
                a value from Parent → Child.
              </div>
            </div>
          </div>

          {/* Info Panels */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg border-slate-300">
              <div className="text-sm font-semibold mb-2 text-slate-700">
                Explanation
              </div>
              <ol className="text-sm text-slate-600 list-decimal ml-4 space-y-1">
                <li>
                  Parent holds a piece of state (<code>propValue</code>).
                </li>
                <li>
                  When sending, we animate a bubble to show the prop flowing
                  down.
                </li>
                <li>The Child re-renders and shows the latest prop value.</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg border-slate-300">
              <div className="text-sm font-semibold mb-2 text-slate-700">
                How to use
              </div>
              <ul className="text-sm text-slate-600 list-disc ml-4 space-y-1">
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Laboriosam, maxime, doloremque alias, cum minus veritatis
                  explicabo.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
