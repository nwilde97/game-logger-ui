import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import ddragonReducer from "./ddragon";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ddragon: ddragonReducer
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
