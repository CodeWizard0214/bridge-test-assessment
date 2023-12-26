import { createSlice } from "@reduxjs/toolkit";
import { Team } from "../pages/TeamList";

export interface TeamsStore {
  teams: Team[];
  total_count: number;
}
const initialState: TeamsStore = {
  teams: [],
  total_count: 0,
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    ...initialState,
  },
  reducers: {
    setTeamsInfo(state, action) {
      state.teams = action.payload;
    },
  },
});

export const { setTeamsInfo } = teamsSlice.actions;
export const getTeamsInfo = (state: any) => state.teams.teams;

export default teamsSlice;
