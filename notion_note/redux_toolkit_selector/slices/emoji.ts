import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface CustomEmojiEntity {
    emojiName: string,
    emojiBase64: string,
    sortOrder: number,
    scale?: number, // 表情的高宽比
}

const customEmojiAdapter = createEntityAdapter<CustomEmojiEntity>({
    selectId: entity => entity.emojiName
})

export const customEmojiSlice = createSlice({
    name: 'customEmoji',
    initialState: customEmojiAdapter.getInitialState(),
    reducers: {
        loadedCustomEmoji: (state, action: PayloadAction<any>) => {
            const emoji = action.payload
            if (state.entities[emoji.emojiName]) {
                console.log("表情已存在，执行更新")
                if (emoji.sortOrder === state.entities[emoji.emojiName].sortOrder) {
                    return
                }
                customEmojiAdapter.updateOne(state, {
                    id: emoji.emojiName,
                    changes: {
                        sortOrder: emoji.sortOrder
                    }
                })
            } else {
                customEmojiAdapter.addOne(state, {
                    emojiName: emoji.emojiName,
                    emojiBase64: emoji.emojiBase64,
                    sortOrder: emoji.sortOrder,
                    scale: emoji?.scale ?? 1
                })
            }
        },
        removeCustomEmoji: (state, action: PayloadAction<any>) => {
            const emojiName = action.payload
            console.log("剔除表情: " + emojiName)
            if (state.entities[emojiName]) {
                customEmojiAdapter.removeOne(state, emojiName)
            }
        }
    }
})

// 向 UI 组件暴露 actions，使 UI 组件获得操作 state 的方法（这种语法表示解构的同时重命名，左边的是原名，右边的是新名）
export const {
    loadedCustomEmoji: loadedCustomEmoji,
    removeCustomEmoji: removeCustomEmoji
} = customEmojiSlice.actions

// 向 UI 组件暴露 selectors，使 UI 组件按一定结构获取 state
export const {
    selectAll: selectAllCustomEmoji, // selectAll 映射 state.ids 数组，并且以同样的顺序返回一个实体数组
    selectEntities: selectCustomEmojiEntities, // selectEntities 返回 state.entities 查找表（注意不是数组）
    selectIds: selectCustomEmojiIds // selectIds 返回 state.ids 数组
} = customEmojiAdapter.getSelectors((state: RootState) => state.customEmoji)

// 向 store 暴露 reducer
export const customEmojiReducer = customEmojiSlice.reducer