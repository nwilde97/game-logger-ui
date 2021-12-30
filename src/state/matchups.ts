import {Matchup} from "../model/matchup";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {findChampMatchups, findMatchupsByAuthor, persistMatchup, removeMatchup} from "../services/matchup.service";
import {query} from "../services/graphql.service";

export interface MatchupsState {
  matchups: Matchup[]
  activeMatchup?: Matchup
  saveState: 'pending' | 'error' | 'success';
}

const initialState: MatchupsState = {
  matchups: [],
  saveState: "pending"
}

export const fetchAuthorMatchups = createAsyncThunk('fetchAuthorMatchups', async (author: string, {rejectWithValue}) => {
  try {
    const data = await findMatchupsByAuthor(author);
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const fetchMatchupById = createAsyncThunk('fetchMatchupById', async (id: string, {rejectWithValue}) => {
  try {
    if(!id) return;
    const result = await query({
      query: `{
  getMatchupById(id:"${id}"){
    id
    author
    champion
    opponent
    rating
    comments
    runes {
      primary
      secondary
      primarySelected
      secondarySelected
      modSelected
    }
    items {
      id
      name
      imageUrl
    }
    f
    d
  }
}`
    });
    console.log(result.getMatchupById)
    return result.getMatchupById;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const fetchChampMatchups = createAsyncThunk('fetchChampMatchups', async (champKey: string, {rejectWithValue}) => {
  try {
    const data = await findChampMatchups(champKey);
    return data!;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const saveMatchup = createAsyncThunk('saveMatchup', async (matchup: Matchup, {rejectWithValue}) => {
  try {
    await persistMatchup(matchup);
    console.log(matchup);
    return matchup;
  } catch (e) {
    return rejectWithValue(matchup);
  }
});

export const deleteMatchup = createAsyncThunk('deleteMatchup', async (id: string, {rejectWithValue}) => {
  try {
    await removeMatchup(id);
    return id;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const slice = createSlice({
  name: 'matchups',
  initialState,
  reducers: {
    setSaveState: (state, action:PayloadAction<"success" | "pending" | "error">) => {
      state.saveState = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChampMatchups.fulfilled, (state, action) => {
        state.matchups = action.payload!;
      })
      .addCase(fetchChampMatchups.pending, (state, action) => {
        state.matchups = [];
      })
      .addCase(fetchMatchupById.fulfilled, (state, action) => {
        state.activeMatchup = action.payload!;
      })
      .addCase(fetchMatchupById.pending, (state, action) => {
        state.saveState = "pending";
        state.activeMatchup = undefined;
      })
      .addCase(fetchAuthorMatchups.fulfilled, (state, action) => {
        state.matchups = action.payload!;
      })
      .addCase(fetchAuthorMatchups.pending, (state, action) => {
        state.matchups = [];
      })
      .addCase(deleteMatchup.fulfilled, (state, action) => {
        state.matchups = state.matchups.filter(m => m.id !== action.payload!);
      })
      .addCase(saveMatchup.pending, (state, action) => {
        state.saveState = "pending";
      })
      .addCase(saveMatchup.rejected, (state, action) => {
        state.saveState = "error";
      })
      .addCase(saveMatchup.fulfilled, (state, action) => {
        state.saveState = "success";
        state.activeMatchup = undefined;
      })
  }
});

export default slice.reducer;

export const {setSaveState} = slice.actions;

export const selectMatchups = (state: RootState): Matchup[] => state.matchups.matchups;
export const selectActiveMatchup = (state: RootState): Matchup | undefined => state.matchups.activeMatchup;
export const selectSaveState = (state: RootState): "pending" | "success" | "error" => state.matchups.saveState;
