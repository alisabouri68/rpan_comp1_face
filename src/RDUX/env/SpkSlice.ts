import { createAppSlice } from "../app/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import AbsMan from "RACT/RACT_absMan";

import services from "BNDL/CANV";
import ComponentReducers, {
  ComponentState,
} from "BNDL/CANV/CANV_compMngt/WRPR_desk/reducers";
import SaveReducers, {
  SaveState,
} from "COMP/RCMP_saveStatus/reducers";

export interface SpkSliceState extends ComponentState, SaveState {
  services?: Array<any>;
  activeService?: any;
  activeSheet?: any;
  absMan?: typeof AbsMan;
}

/**
 *
 * @param obj
 * @returns
 */
const removeComponentKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeComponentKeys);
  } else if (obj !== null && typeof obj === "object") {
    const newObj: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (!["component", "auxiliary"].includes(key)) {
        newObj[key] = removeComponentKeys(value);
      }
    }
    return newObj;
  }
  return obj;
};

const initialState: SpkSliceState = {
  services: removeComponentKeys(services) /*absMan: AbsMan*/,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const spkSlice = createAppSlice({
  name: "spk",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    add: create.reducer((state, action: PayloadAction<SpkSliceState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.activeService = action.payload.activeService;
      state.activeSheet = action.payload.activeSheet;
    }),
    ...ComponentReducers(create),
    ...SaveReducers(create),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectSpk: (spk) => spk.services,
  },
});

// Action creators are generated for each case reducer function.
export const { add, setSchema, setSelectedWidget, setMode, setBioParam, setBioParamOrg, setSaveStatus } = spkSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectSpk } = spkSlice.selectors;
