import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import twitchAuthReducer from './slices/twitchAuthSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        twitchAuth: twitchAuthReducer
    }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store