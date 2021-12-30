import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {User} from "../model/user";
import {query} from "../services/graphql.service";

export interface UserState {
  all: User[];
}

const initialState: UserState = {
  all: []
}

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async (args, {rejectWithValue}) => {
  try {
    const users = await query({
      query: `{
        getAllUsers{
          id description nickname facebook twitter twitch youtube instagram email
        }
      }`
    });
    return users.getAllUsers;
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
