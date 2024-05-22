import { configureStore } from "@reduxjs/toolkit";
import { bidReducer } from "../slices/bidSlice";

export const bidStore = configureStore({
    reducer: { bid: bidReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})