import { configureStore } from '@reduxjs/toolkit'
import { customEmojiReducer } from './slices/emoji'

const store = configureStore({
    reducer: {
        customEmoji: customEmojiReducer
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store