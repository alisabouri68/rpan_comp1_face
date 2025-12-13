// RDUX/store.ts
import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// ENV Slices
import { globeSlice } from "./env/GlobeSlice";
import { hybSlice } from "./env/HybSlice";
import { profileSlice } from "./env/ProfileSlice";
import { consoleSlice } from "./env/ConsoleSlice";
import { spkSlice } from "./env/SpkSlice";
import { compSlice } from "./env/CompSlice";
import { plugSlice } from "./env/PlugSlice"; 


import dynaReducer from "./dynaEnv/dynaSlice";//کویری اسلایس خودم


// -----------------------------------
//  ROOT REDUCER
// -----------------------------------
const rootReducer = combineSlices(
  globeSlice,
  hybSlice,
  profileSlice,
  consoleSlice,
  spkSlice,
  compSlice,
  plugSlice,      
  {
    reducerPath: "dyna",
    reducer: dynaReducer,
  }
);


// -----------------------------------
//  STORE
// -----------------------------------
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plugSlice.middleware),
});

setupListeners(store.dispatch);


// -----------------------------------
//  TYPES
// -----------------------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
