import { configureStore } from "@reduxjs/toolkit";
import teamsSlice from "./teamsSlice";
import playersSlice from "./playerSlice";

export default configureStore({
  reducer: {
    [teamsSlice.name]: teamsSlice.reducer,
    [playersSlice.name]: playersSlice.reducer,
  },
});
