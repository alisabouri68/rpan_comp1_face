import { PayloadAction, ReducerCreators } from "@reduxjs/toolkit";
import { SpkSliceState } from "RDUX/env/SpkSlice";

export interface ComponentState {
  schema?: any;
  selectedWidget?: any;
  bioParam?: any;
  bioParamOrg?: any;
  microChilds?: any;
  mood?: String;
  pickRequest?: String;
}

export default (create: ReducerCreators<SpkSliceState>) => ({
  setSchema: create.reducer((state, action: PayloadAction<any>) => {
    state.schema = action.payload;
  }),
  setSelectedWidget: create.reducer((state, action: PayloadAction<any>) => {
    state.selectedWidget = action.payload;
  }),
  setMode: create.reducer((state, action: PayloadAction<any>) => {
    state.mood = action.payload;
  }),
  setBioParam: create.reducer((state, action: PayloadAction<any>) => {
    state.bioParam = action.payload;
  }),
  setBioParamOrg: create.reducer((state, action: PayloadAction<any>) => {
    state.bioParamOrg = action.payload;
  }),
  setPickRequest: create.reducer((state, action: PayloadAction<any>) => {
    state.pickRequest = action.payload;
  }),
});
