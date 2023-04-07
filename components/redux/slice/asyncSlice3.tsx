// component/redux/slice/asyncSlice.tsx
import { AnyAction, createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { asyncInitialState } from "../state/stateType"
import { RootState } from "../store/store"

const asyncSlice3 = createSlice({
    name: 'asyncData3',
    initialState: asyncInitialState,
    reducers: {
        getUsersStart(state) {
            state.isLoaded = true
        },
        getUsersSuccess(state, action) {
            // 要根據你的fetch回來的資料來決定要怎麼寫 否則會出錯喔~
            state.AsyncStateList = action.payload
            state.isLoaded = false
            state.isComplete = true
        },
        getUsersFailure(state) {
            state.isLoaded = false
            state.isComplete = false
        },
    }
})

export const fetchUsers = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(getUsersStart());
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        dispatch(getUsersSuccess(data));
        return data;
    } catch (error) {
        console.log(error)
        dispatch(getUsersFailure(error.message));
    }
};

export const { getUsersStart, getUsersSuccess, getUsersFailure } = asyncSlice3.actions

export const selectAsync3 = (state: RootState) => state.async3


export default asyncSlice3.reducer
