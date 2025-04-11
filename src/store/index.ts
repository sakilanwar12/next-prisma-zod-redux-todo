import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counterSlice";
import { apiSlice } from "./api";

const rootReducer = combineSlices(counterSlice, apiSlice);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;
// Infer the `TAppDispatch` type from the store itself
export type TAppDispatch = typeof store.dispatch;
