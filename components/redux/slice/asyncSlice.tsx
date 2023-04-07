// component/redux/slice/asyncSlice.tsx
import { AnyAction, createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { asyncInitialState } from "../state/stateType"
import { RootState } from "../store/store"

export const fetchFirstData = createAsyncThunk(
    'first/fetchData',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
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

export const asyncSlice = createSlice({
    name: 'asyncData',
    initialState: asyncInitialState,
    reducers: {
        // 當然也可以不要有，如果你只是想要fetch資料到store中的話
        setDataTitle: (state, action: PayloadAction<string>) => {
            setTimeout(() => {
                state.title = action.payload
            }, 3000)
        },
        getUsersStart(state) {
            state.isLoading = true;
        },
        getUsersSuccess(state, action) {
            state.isLoading = false;
            state.title = action.payload;
        },
        getUsersFailure(state, action) {
            state.isLoading = false;
            state.title = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFirstData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchFirstData.fulfilled, (state, action) => {
                state.isLoading = false
                state.userId = action.payload.userId
                state.id = action.payload.id
                state.title = action.payload.title
                state.completed = action.payload.completed
            })
            .addCase(fetchFirstData.rejected, (state, action) => {
                state.title = "error"
                state.isLoading = false
            })

            .addCase(timeoutChange.fulfilled, (state, action) => {
                state.title = action.payload
            })

    }
})
export const { setDataTitle, getUsersStart, getUsersSuccess, getUsersFailure } = asyncSlice.actions

// export const selectDataTitle = (state: RootState) => state.async.title

export const fetchUsers = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch(getUsersStart());
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        dispatch(getUsersSuccess(data[0].name));
    } catch (error) {
        console.log(error)
        dispatch(getUsersFailure(error.message));
    }
};

export default asyncSlice.reducer
