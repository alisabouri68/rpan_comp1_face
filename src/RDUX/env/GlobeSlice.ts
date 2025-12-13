import { createAppSlice } from "../app/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"
import AbsMan from 'RACT/RACT_absMan';

export interface GlobeSliceState { absMan?: typeof AbsMan }

const initialState: GlobeSliceState = { /*absMan: AbsMan*/ }

// If you are not using async thunks you can use the standalone `createSlice`.
export const globeSlice = createAppSlice({
    name: "globe",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: create => ({
        add: create.reducer((state, action: PayloadAction<GlobeSliceState>) => {

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
        selectGlobe: globe => globe,
    },
})

// Action creators are generated for each case reducer function.
export const { add } = globeSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectGlobe } = globeSlice.selectors