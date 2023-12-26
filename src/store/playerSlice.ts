import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../pages/TeamRoster";

export interface PlayersStore {
  players: Player[];
  total_count: number;
}
const initialState: PlayersStore = {
  players: [],
  total_count: 0,
};

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    ...initialState,
  },
  reducers: {
    setPlayersInfo(state, action) {
      state.players = action.payload;
    },
  },
});

export const { setPlayersInfo } = playersSlice.actions;
export const getPlayersInfo = (state: any) => state.players.players;

export default playersSlice;
