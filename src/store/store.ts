import { configureStore } from "@reduxjs/toolkit";
import ipoReducer from "./slice/ipo.slice";
import dialogReducer from "./slice/dialog.slice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    IPO: ipoReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
