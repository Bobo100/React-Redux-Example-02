// component/redux/slice/asyncSlice.tsx
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store/store"

const initialState = {
    users: [
        { name: "John", age: 21 },
        { name: "Jane", age: 19 }
    ],
    userNames: ["John", "Jane"]
}


const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            action => action.type === 'users/addUser' && action.payload.user.age > 18, // 條件：新增用戶的年齡大於18歲            
            (state, action) => {
                state.users.push(action.payload.user); // 在users列表中添加新用戶
                state.userNames.push(action.payload.user.name); // 在userNames列表中添加新用户的名字
            }
        )
    }
})

export const selectUsers = (state: RootState) => state.user

export default userSlice.reducer
