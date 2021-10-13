import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import champions from "./champions";
import matchups from "./matchups";
import session from "./session";

export const store = configureStore({
  reducer: {
    champions,
    matchups,
    session
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
