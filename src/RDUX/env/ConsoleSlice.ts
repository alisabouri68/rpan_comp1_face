import { createAppSlice } from "../app/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"
import AbsMan from 'RACT/RACT_absMan';

export interface ConsoleSliceState { absMan?: typeof AbsMan }

const initialState: ConsoleSliceState = { /*absMan: AbsMan */ }

// If you are not using async thunks you can use the standalone `createSlice`.
export const consoleSlice = createAppSlice({
    name: "console",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: create => ({
        add: create.reducer((state, action: PayloadAction<ConsoleSliceState>) => {

            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            console.log('====================================');
            console.log(state, action);
            console.log('====================================');
        }),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectConsole: console => console,
    },
})

// Action creators are generated for each case reducer function.
export const { add } = consoleSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectConsole } = consoleSlice.selectors