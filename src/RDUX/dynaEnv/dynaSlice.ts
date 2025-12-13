import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DynaState } from 'TYPE/dynaTypes'
import { setByPath } from './dynaPath'

// 🌟 Initial state برای DynaSlice
// هر namespace یک بخش از استیت است که می‌تواند dynamic داده‌ها را نگه دارد
export const initialState: DynaState = {
  ENVI_GLOB: {}, 
  ENVI_CONS: {}, 
  ENVI_HYB: {},  
  ENVI_CANV: {}, 
  ENVI_COMP: {}, 
  ENVI_PLUG: {}, 
  ENVI_PROF: {}  
}

// 🎯 ایجاد Slice برای DynaState با createSlice
export const dynaSlice = createSlice({
  name: 'dyna',  // نام slice
  initialState,
  reducers: {
    // 🔹 setPath: مقدار یک مسیر مشخص را جایگزین می‌کند
    setPath: (state, action: PayloadAction<{ path: string; value: any }>) => {
      setByPath(state, action.payload.path, action.payload.value, false)
    },

    // 🔹 mergePath: مقدار یک مسیر مشخص را با merge انجام می‌دهد (shallow merge)
    mergePath: (state, action: PayloadAction<{ path: string; value: any }>) => {
      setByPath(state, action.payload.path, action.payload.value, true)
    },

    // 🔹 bulkSet: چند مسیر و مقدار را به صورت همزمان بروزرسانی می‌کند
    bulkSet: (state, action: PayloadAction<Record<string, any>>) => {
      const updates = action.payload
      for (const path in updates) {
        setByPath(state, path, updates[path], true)
      }
    },

    // 🔹 reset: کل state را ریست کرده و یا مقدار جدید جایگزین می‌کند
    reset: (state, action: PayloadAction<DynaState | undefined>) => {
      const next = action.payload ?? initialState
      return next  // return کردن state جدید به Immer/RTK
    }
  }
})

// 📝 Export کردن actionها برای استفاده در dispatch
export const { setPath, mergePath, bulkSet, reset } = dynaSlice.actions

// 🏷 Export default reducer برای store
export default dynaSlice.reducer