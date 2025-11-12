import { configureStore } from "@reduxjs/toolkit";
import dynaReducer from "./dynaSlice";

export const dynaStore = configureStore({
    reducer: {
        dyna: dynaReducer,
    },
});

export type RootState = ReturnType<typeof dynaStore.getState>;
export type AppDispatch = typeof dynaStore.dispatch;
