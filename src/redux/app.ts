import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  currentPage: string;
  menu: Array<string>;
}

const appState: AppState = {
  currentPage: "",
  menu: ["new", "past", "comments", "ask", "show", "jobs", "submit"],
};

export const app = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<AppState["currentPage"]>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = app.actions;
