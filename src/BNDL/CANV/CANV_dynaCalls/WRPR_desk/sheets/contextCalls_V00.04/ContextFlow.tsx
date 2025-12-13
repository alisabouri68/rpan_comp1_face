import { useContext } from "react";
import HotContext from "./HotContext";

export default function Cast() {
  const value = useContext(HotContext);

  return (
    <div className="absolute right-6 top-10 w-40 h-28 rounded-2xl border-2 flex flex-col items-center justify-center dark:border-slate-600 transition-colors">
      <div className="text-sm text-slate-500 dark:text-slate-300">
        Cast (Consumer)
      </div>
      <div className="mt-1 text-xs text-slate-400 dark:text-slate-400">
        useContext(value)
      </div>
      <div className="mt-2 px-2 py-1 bg-teal-50 dark:bg-teal-900/40 rounded-full text-sm font-medium border dark:border-teal-700">
        <span className="text-teal-700 dark:text-teal-300">
          context: {value}
        </span>
      </div>
    </div>
  );
}
