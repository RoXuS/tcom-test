import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { live } from "./live";
import { app } from "./app";

const rootReducer = combineReducers({
  live: live.reducer,
  app: app.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
