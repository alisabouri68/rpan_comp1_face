import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DynaState {
    ["ENVI-glob"]: Record<string, any>;
    ENVI_CONS: Record<string, any>;
    [key: string]: any;
}

const initialState: DynaState = {
    "ENVI-glob": {},
    ENVI_CONS: {},
};

// helpers
function getByPath(obj: any, path: string) {
    if (!path) return obj;
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function setByPath(obj: any, path: string, value: any, merge = false) {
    if (!path) return value;
    const parts = path.split(".");
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (typeof cur[p] !== "object" || cur[p] === null) cur[p] = {};
        cur = cur[p];
    }
    const last = parts[parts.length - 1];
    if (merge && typeof cur[last] === "object" && typeof value === "object") {
        cur[last] = { ...cur[last], ...value };
    } else {
        cur[last] = value;
    }
}

export const dynaSlice = createSlice({
    name: "dyna",
    initialState,
    reducers: {
        setPath: (state, action: PayloadAction<{ path: string; value: any }>) => {
            setByPath(state, action.payload.path, action.payload.value, false);
        },
        mergePath: (state, action: PayloadAction<{ path: string; value: any }>) => {
            setByPath(state, action.payload.path, action.payload.value, true);
        },
        bulkSet: (state, action: PayloadAction<Record<string, any>>) => {
            const updates = action.payload;
            Object.keys(updates).forEach((path) => {
                setByPath(state, path, updates[path], true);
            });
        },
        reset: (state, action: PayloadAction<DynaState | undefined>) => {
            const next = action.payload ?? initialState;
            Object.keys(state).forEach((k) => delete (state as any)[k]);
            Object.assign(state, next);
        },
    },
});

export const { setPath, mergePath, bulkSet, reset } = dynaSlice.actions;
export default dynaSlice.reducer;
