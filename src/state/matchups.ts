import {MatchupList} from "../model/matchup";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

const URL = 'https://e76jydntqk.execute-api.us-west-2.amazonaws.com/v1';

export interface MatchupsState {
    matchups: {
        [author: string]: MatchupList[]
    }
}

const initialState: MatchupsState = {
    matchups: {}
}

export const fetchAuthorMatchups = createAsyncThunk('fetchAuthorMatchups', async (author: string, {rejectWithValue}) => {
    try {
        const response = await fetch(`${URL}/matchups/${author}`);
        const data: MatchupList[] = await response.json();
        return {author: author, data};
    } catch (e) {
        rejectWithValue(e);
    }
})

const slice = createSlice({
    name: 'matchups',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchAuthorMatchups.fulfilled, (state, action) => {
                state.matchups[action.payload!.author] = action.payload!.data;
            })
    }
});

export default slice.reducer;

export const getAuthorMatchups = (state: RootState, author: string) => state.matchups.matchups[author];
