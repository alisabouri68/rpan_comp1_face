import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export default function ImportExportDiagram() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [flowId, setFlowId] = useState(0);
  const [auto, setAuto] = useState(false);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      triggerExport();
    }, 2500);
    return () => clearInterval(t);
  }, [auto]);

  const triggerExport = () => {
    setIsExporting(true);
    setFlowId((id) => id + 1);
    
    setTimeout(() => {
      setIsExporting(false);
      setIsImporting(true);
      
      setTimeout(() => {
        setIsImporting(false);
      }, 1000);
    }, 1000);
  };

  const triggerManualCycle = () => {
    triggerExport();
  };

  const iconVariants: Variants = {
    export: {
      scale: [1, 1.2, 1],
      rotate: [0, -10, 0],
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    import: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, 0],
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const arrowVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div>
      <div className="min-h-screen w-full flex items-start justify-center bg-white dark:bg-gray-800 p-6 transition-colors duration-500">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-700 transition-colors duration-500">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
             SET selector Import flow
            </h2>

            <div className="flex gap-2 items-center">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                Auto cycle
              </label>
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
              <button
                onClick={triggerManualCycle}
                className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm shadow-sm hover:bg-indigo-700"
              >
                Start Cycle
              </button>
            </div>
          </div>

          {/* Main Diagram */}
          <div className="relative h-80 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600 p-8 overflow-hidden">
            
            {/* Source Module */}
            <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={isExporting ? "export" : "import"}
                variants={iconVariants}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </motion.div>
              <div className="text-center mt-3">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Module A</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">export</div>
              </div>
            </div>

            {/* Target Module */}
            <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={isImporting ? "import" : "export"}
                variants={iconVariants}
                className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </motion.div>
              <div className="text-center mt-3">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Module B</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">import</div>
              </div>
            </div>

            {/* Circular Arrow Path */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <path
                d="M100,100 C150,50 250,50 300,100 C250,150 150,150 100,100"
                stroke="url(#cycleGradient)"
                strokeWidth="3"
                strokeDasharray="8 4"
                fill="none"
              />
            </svg>

            {/* Animated Export Icon */}
            <AnimatePresence>
              {isExporting && (
                <motion.div
                  key={`export-${flowId}`}
                  variants={arrowVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{
                      x: [0, 150, 300, 150, 0],
                      y: [0, -50, 0, 50, 0],
                      rotate: [0, 180, 360, 540, 720]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      times: [0, 0.25, 0.5, 0.75, 1]
                    }}
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated Import Icon */}
            <AnimatePresence>
              {isImporting && (
                <motion.div
                  key={`import-${flowId}`}
                  variants={arrowVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{
                      x: [0, -150, -300, -150, 0],
                      y: [0, 50, 0, -50, 0],
                      rotate: [0, -180, -360, -540, -720]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      times: [0, 0.25, 0.5, 0.75, 1]
                    }}
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Label */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200 dark:border-slate-600">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Cycle</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Import ↔ Export</div>
              </div>
            </div>

          </div>

          {/* Code Examples */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg dark:border-slate-600 bg-blue-50 dark:bg-blue-900/20">
              <div className="text-sm font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Export (Module A)
              </div>
              <pre className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded overflow-x-auto">
{`// moduleA.js
export const config = {
  theme: 'dark',
  version: '1.0.0'
};

export function utils() {
  return 'Hello from Module A';
};

export default mainFunction;`}
              </pre>
            </div>

            <div className="p-4 border rounded-lg dark:border-slate-600 bg-green-50 dark:bg-green-900/20">
              <div className="text-sm font-semibold mb-3 text-green-700 dark:text-green-300 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Import (Module B)
              </div>
              <pre className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded overflow-x-auto">
{`// moduleB.js
import mainFunction, { 
  config, 
  utils 
} from './moduleA';

// Use imported exports
const theme = config.theme;
const message = utils();
mainFunction();`}
              </pre>
            </div>
          </div>

          {/* Info Panel */}
          <div className="mt-6 p-4 border rounded-lg dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50">
            <div className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
              Import/Export Cycle Explained
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <p>This diagram shows the beautiful circular flow of JavaScript modules:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li><strong>Module A</strong> exports functions, variables, and components</li>
                <li><strong>Module B</strong> imports these exports to use them</li>
                <li>The cycle continues as modules depend on each other</li>
                <li>No data transfer - just module dependency relationships</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}