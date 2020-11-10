import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemResponse, LiveResponse } from "../types/live";

export interface LiveState {
  news: LiveResponse;
  tops: LiveResponse;
  page: number;
  size: number;
  currentLive: Array<ItemResponse>;
}

const liveState: LiveState = {
  news: [],
  tops: [],
  page: 0,
  size: 30,
  currentLive: [],
};

export const live = createSlice({
  name: "live",
  initialState: liveState,
  reducers: {
    setNews: (state, action: PayloadAction<LiveState["news"]>) => {
      state.news = action.payload;
    },
    setTops: (state, action: PayloadAction<LiveState["tops"]>) => {
      state.tops = action.payload;
    },
    setPage: (state, action: PayloadAction<LiveState["page"]>) => {
      state.page = action.payload;
    },
    setCurrentLive: (
      state,
      action: PayloadAction<LiveState["currentLive"]>
    ) => {
      state.currentLive = action.payload;
    },
  },
});

export const { setNews, setTops, setCurrentLive, setPage } = live.actions;
