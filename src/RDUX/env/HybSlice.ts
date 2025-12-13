import { createAppSlice } from "../app/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"
import AbsMan from 'RACT/RACT_absMan';

export interface HybSliceState { isAuth: boolean, user?: any, absMan?: typeof AbsMan }

const initialState: HybSliceState = { isAuth: false, user: null, /*absMan: AbsMan*/ }

// If you are not using async thunks you can use the standalone `createSlice`.
export const hybSlice = createAppSlice({
    name: "hyb",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: create => ({
        logout: create.reducer((state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuth = false
            state.user = null
        }),
        login: create.reducer((state, action: PayloadAction<HybSliceState>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuth = action.payload.isAuth
            state.user = action.payload.user
        }),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectIsAuth: hyb => hyb.isAuth,
        selectUser: hyb => hyb.user,
    },
})

// Action creators are generated for each case reducer function.
export const { login, logout } = hybSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIsAuth, selectUser } = hybSlice.selectors