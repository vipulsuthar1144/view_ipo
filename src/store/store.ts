import { configureStore } from "@reduxjs/toolkit";
import ipoReducer from "./slice/ipo.slice";
import dialogReducer from "./slice/dialog.slice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    IPO: ipoReducer,
    dialog: dialogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["IPO.selectedImageData.image"], // Ignore File object warnings
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
