import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slice/company.slice";
import ipoReducer from "./slice/ipo.slice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    IPO: ipoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
