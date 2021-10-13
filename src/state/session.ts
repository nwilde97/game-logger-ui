import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {navigate} from "@reach/router";

export interface User {
    id: string;
    username: string;
}

export interface SessionState {
    user?: User;
}

const initialState: SessionState = {

}

export const verifyToken = createAsyncThunk('verifyToken', async (token: string, {rejectWithValue}) => {
    try {
        const user = await fetch(`https://discord.com/api/users/@me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(r => r.json());
        window.localStorage.setItem("session", JSON.stringify(user));
        return user;
    } catch (e) {
        console.log(`Couldn't verify token ${token}`, e);
        rejectWithValue(e);
    }
});

export const slice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(verifyToken.fulfilled, (state, action) => {
            state.user = action.payload;
            navigate("/");
        })
    }
});

export default slice.reducer;

export const {setUser} = slice.actions;

export const selectSessionUser = (state: RootState) => state.session.user
