import {Matchup, MatchupList} from "../model/matchup";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

export const API_URL = 'https://e76jydntqk.execute-api.us-west-2.amazonaws.com/v1';

// export const API_URL = 'http://localhost:8080';

export interface MatchupsState {
    matchups: {
        [author: string]: Matchup[]
    }
}

const initialState: MatchupsState = {
    matchups: {}
}

export const fetchAuthorMatchups = createAsyncThunk('fetchAuthorMatchups', async (author: string, {rejectWithValue}) => {
    try {
        const response = await fetch(`${API_URL}/matchups/${author}`);
        const data: Matchup[] = await response.json();
        return {author: author, data};
    } catch (e) {
        rejectWithValue(e);
    }
});

export const saveMatchup = createAsyncThunk('saveMatchup', async ([author, matchup]:[string, Matchup], {rejectWithValue}) => {
    try {
        await fetch(`${API_URL}/matchups/${author}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(matchup)
        });
        return {author, matchup};
    } catch (e) {
        rejectWithValue(e);
    }
});

const slice = createSlice({
    name: 'matchups',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAuthorMatchups.fulfilled, (state, action) => {
                state.matchups[action.payload!.author] = action.payload!.data;
            })
            .addCase(saveMatchup.fulfilled, (state, action) => {
                if (action.payload) {
                    const matchup: Matchup = action.payload.matchup;
                    const author = action.payload.author;
                    const matchups = [...state.matchups[author]];
                    const filtered = matchups.filter(m => m.opponent !== matchup.opponent || m.champion !== matchup.champion);
                    filtered.push(matchup);
                    state.matchups[author] = filtered;
                }
            })
    }
});

export default slice.reducer;

export const selectAuthorMatchups = (state: RootState, author: string): Matchup[] => state.matchups.matchups[author];
export const selectAuthorMatchupLists = (state: RootState, author: string): MatchupList[] | undefined => {
    const list = selectAuthorMatchups(state, author);
    if (!list) return;
    const champMap: { [key: string]: MatchupList } = {};
    for (const matchup of list) {
        if (!champMap[matchup.champion]) {
            champMap[matchup.champion] = {
                matchups: [],
                author,
                key: matchup.champion.toString()
            }
        }
        let rating = champMap[matchup.champion].matchups.find(r => r.rating === matchup.rating);
        if (!rating) {
            rating = {
                rating: matchup.rating,
                opponents: []
            };
            champMap[matchup.champion].matchups.push(rating);
        }
        rating.opponents.push({
            key: matchup.opponent.toString()
        });
    }
    return Object.values(champMap);
}
