import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Champ, getChampList} from "../services/ddragon.service";

export interface ChampionState {
    champs?: Champ[];
    status: 'initial' | 'success' | 'loading' | 'failed';
}

const initialState: ChampionState = {
    status: 'initial',
};

export const fetchChampList = createAsyncThunk('fetchChampList', async (_, { rejectWithValue } ) => {
    try {
        const champs = await getChampList();
        return champs.sort((a,b) => a.name.localeCompare(b.name));
    } catch(e) {
        rejectWithValue(e);
    }
});


const slice = createSlice({
    name: 'champions',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setChamps: (state, action: PayloadAction<Champ[]>) => {
            state.champs = action.payload;
            state.status = 'success';
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchChampList.pending, (state)=> {
                state.status = 'loading';
            })
            .addCase(fetchChampList.rejected, (state, { error }) => {
                console.log(error);
                state.status = 'failed';
            })
            .addCase(fetchChampList.fulfilled, (state, action: PayloadAction<Champ[] | undefined>) => {
                state.champs = action.payload!;
                state.status = 'success';
            })
    },
});

export const { setChamps } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChamps = (state: RootState) => state.champions.champs;
export const getChampLoadingState = (state: RootState) => state.champions.status;
export const getChampByKey = (state: RootState, key: string) => state.champions.champs?.find(champ => champ.key === key);

export default slice.reducer;