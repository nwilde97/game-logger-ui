import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "./store";
import {API_URL} from "../services/environment";
import {User} from "../model/user";

export interface UserState {
  all: User[];
}

const initialState: UserState = {
  all: []
}

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async (args, {rejectWithValue}) => {
  try {
    const users: User[] = await axios.get(`${API_URL}/users`).then(r=>r.data);
    return users;
  } catch (e) {
    rejectWithValue(e);
  }
})

const slice = createSlice({
  name: 'users', initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.all = action.payload || [];
    })
  }
});

export default slice.reducer

export const selectAllUsers = (state: RootState) => state.users.all
