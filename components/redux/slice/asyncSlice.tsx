// component/redux/slice/asyncSlice.tsx
import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { asyncInitialState } from "../state/stateType"
import { RootState } from "../store/store"

export const fetchFirstData = createAsyncThunk(
    'first/fetchData',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        return data
    }
)

const asyncSlice = createSlice({
    name: 'asyncData',
    initialState: asyncInitialState,
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
    }
})

export const selectAsync = (state: RootState) => state.async

export default asyncSlice.reducer
