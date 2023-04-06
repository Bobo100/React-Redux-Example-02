// components/redux/store/store.tsx
import { configureStore } from '@reduxjs/toolkit'
import async from '../slice/asyncSlice'

export const store = configureStore({
    reducer: {
        async
    },
    // 預設就是true，但是如果你要自己設定的話，可以這樣寫(根本沒影響 除非你要關閉)
    // 關閉就會
    // Error: Actions must be plain objects. Use custom middleware for async actions.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: true
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch