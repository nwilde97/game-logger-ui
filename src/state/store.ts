import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import champions from "./champions";
import matchups from "./matchups";
import session from "./session";
import users from "./users";
import league from "./league";
import runes from "./runes";
import items from "./items";

export const store = configureStore({
  reducer: {
    champions,
    matchups,
    session,
    users,
    league,
    runes,
    items
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
