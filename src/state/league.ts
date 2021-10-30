import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

export interface LeagueState {
  listenerStatus: "active" | "inactive";
  gameStatus: "active" | "inactive";
  questionActive: boolean;
  activeChamp?: string;
}

const initialState: LeagueState = {
  listenerStatus: "inactive",
  gameStatus: "inactive",
  questionActive: false
}

const slice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setListenerStatus: (state, action: PayloadAction<"active" | "inactive">) => {
      state.listenerStatus = action.payload;
    },
    beginGame: (state, action: PayloadAction<string>) => {
      console.log("action here");
      state.gameStatus = "active";
      state.activeChamp = action.payload;
    },
    endGame: (state, action: PayloadAction<void>) => {
      state.gameStatus = "inactive"
      state.questionActive = true;
      state.listenerStatus = "inactive";
    },
    hideQuestion: (state, action: PayloadAction<void>) => {
      state.questionActive = false;
    }
  }
});

export const {setListenerStatus, beginGame, endGame, hideQuestion} = slice.actions;

export default slice.reducer;

export const selectListenerStatus = (state: RootState) => state.league.listenerStatus;
export const selectGameStatus = (state: RootState) => state.league.gameStatus;
export const selectQuestionActive = (state: RootState) => state.league.questionActive;
export const selectActiveChamp = (state: RootState) => state.league.activeChamp;
