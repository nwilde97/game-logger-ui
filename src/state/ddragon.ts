import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export interface DdragonState {
    champs: string[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: DdragonState = {
    champs: [],
    status: 'idle',
};


export const ddragonSlice = createSlice({
    name: 'ddragon',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setChamps: (state, action: PayloadAction<string[]>) => {
            state.champs = action.payload;
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
    },
});

export const { setChamps } = ddragonSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChamps = (state: RootState) => state.ddragon.champs;

export default ddragonSlice.reducer;
