import { configureStore } from "@reduxjs/toolkit";
import { toastMessageReducer } from "./reducers";
const reducer = { toastMessage: toastMessageReducer };

export const store = configureStore({ reducer });
export type RootState = ReturnType<typeof store.getState>;
