import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./dynaStore";
import { setPath, mergePath, bulkSet, reset } from "./dynaSlice";

function getByPath(obj: any, path: string) {
  if (!path) return obj;
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function useDyna() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.dyna);

  return {
    state,
    get: (path: string) => getByPath(state, path),
    set: (path: string, value: any) => dispatch(setPath({ path, value })),
    merge: (path: string, value: any) => dispatch(mergePath({ path, value })),
    bulkSet: (obj: Record<string, any>) => dispatch(bulkSet(obj)),
    reset: (next?: any) => dispatch(reset(next)),
  };
}
