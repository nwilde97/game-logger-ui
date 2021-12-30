import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {navigate} from "@reach/router";
import axios from "axios";
import {DiscordInfo, User} from "../model/user";
import {query} from "../services/graphql.service";

export interface SessionState {
  user?: User;
  discord?: DiscordInfo
}

const initialState: SessionState = {}

export const verifyToken = createAsyncThunk('verifyToken', async (token: string, {rejectWithValue}) => {
  try {
    const discord: DiscordInfo = await axios.request( {
      url: `https://discord.com/api/users/@me`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.data);
    return discord;
  } catch (e) {
    console.log(`Couldn't verify token ${token}`, e);
    rejectWithValue(e);
  }
});

const postUser = async (user:User) => {
  await query({
    query: `mutation {
  saveUser(user:${JSON.stringify(user).replace(/"([^"]+)":/g, '$1:')})
}
`
  });
  return user;
}

export const updateLoggedInUser = createAsyncThunk('updateLoggedInUser', async (discord:DiscordInfo, {rejectWithValue})=> {
  try {
    const user = await query({
      query: `{
        getUser(id:"${discord.id}"){id description nickname facebook twitter twitch youtube instagram email}
      }`
    });
    return user.getUser;
  } catch (e) {
    rejectWithValue(e);
  }
});

export const saveUser = createAsyncThunk('saveUser', async (user:User, {rejectWithValue}) => {
  try {
    return postUser(user);
  } catch (e) {
    rejectWithValue(e);
  }
})

export const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<User>) => {
      state.user = action.payload;
    },
    setDiscordInfo:  (state, action:PayloadAction<DiscordInfo>) => {
      state.discord = action.payload;
    },
    logout: (state, action:PayloadAction<undefined>) => {
      state.discord = undefined;
      state.user = undefined;
      window.localStorage.removeItem("session");
      navigate("/");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.discord = action.payload;
      window.localStorage.setItem("session", JSON.stringify(state.discord));
      navigate("/");
    }).addCase(updateLoggedInUser.fulfilled, (state, action) => {
      state.user = action.payload;
    }).addCase(saveUser.fulfilled, (state, action) => {
      state.user = action.payload;
    }).addCase(updateLoggedInUser.rejected, (state) => {
      state.discord = undefined;
      state.user = undefined;
      window.localStorage.removeItem("session");
      navigate("/");
    })
  }
});

export default slice.reducer;

export const {setUser, setDiscordInfo, logout} = slice.actions;

export const selectSessionUser = (state: RootState) => state.session.user
export const selectDiscordInfo = (state: RootState) => state.session.discord
