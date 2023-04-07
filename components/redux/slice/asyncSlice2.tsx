// component/redux/slice/asyncSlice2.tsx
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { asyncInitialState2 } from "../state/stateType"
import { RootState } from "../store/store"

export const fetchFirstData = createAsyncThunk(
    'asyncData2/first/fetchData',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        return data
    }
)

export const timeoutChange = createAsyncThunk(
    'asyncData/timeoutChange',
    async (title: string, { rejectWithValue }) => {
        try {
            const result = await new Promise<string>((resolve) => {
                setTimeout(() => {
                    resolve(title);
                }, 3000);
            });
            return result;
        } catch (err) {
            return rejectWithValue({ message: 'Timeout change failed', title });
        }
    }
);

const asyncSlice2 = createSlice({
    name: 'asyncData2',
    initialState: asyncInitialState2,
    reducers: {        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFirstData.pending, (state) => {
                state.isLoaded = true
            })
            .addCase(fetchFirstData.fulfilled, (state, action) => {
                state.isLoaded = false
                state.isComplete = true
                state.AsyncStateList = action.payload
            })
            .addCase(fetchFirstData.rejected, (state) => {
                state.isLoaded = false
                state.isComplete = false
            })

            .addCase(timeoutChange.pending, (state) => {
                console.log("pending")
            })
            .addCase(timeoutChange.fulfilled, (state, action) => {
                state.isLoaded = false
                state.isComplete = true
                state.AsyncStateList[0].username = action.payload
                console.log("fulfilled", state.AsyncStateList, action.payload)
            })
            .addCase(timeoutChange.rejected, (state) => {
                console.log("rejected")
            })
    }
})

export const selectAsync2 = (state: RootState) => state.async2

export default asyncSlice2.reducer
