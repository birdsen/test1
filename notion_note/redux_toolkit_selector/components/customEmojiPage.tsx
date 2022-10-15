import * as React from 'react'
import { useAppSelector } from '../hooks'
import { selectAllCustomEmoji } from '../slices/emoji'
import IconEmojiLoading from '@icon/ic_big_emoji_loading.svg'
import style from './style.module.scss'

interface customEmojiPageProps {
    setModalVisible
    customEmojiClickListener: (clickedItem: string) => void
}

export const CustomEmojiPage = (props: customEmojiPageProps) => {

    const customEmojis = useAppSelector(selectAllCustomEmoji)

    const [customEmojiCount, setCustomEmojiCount] = React.useState<number>(0)

    // 由于每次表情面板弹起都期望能增量同步收藏表情，所以表情的数量也要每次都重新获取
    React.useEffect(() => {
        window.api.kv.get("customEmojiResp").then(result => {
            setCustomEmojiCount(result?.resources[0]?.stickers.length ?? 0)
        })
    }) // 参数2不写，组件每渲染一次，副效应函数就自动执行一次

    let rows: number[] = []
    let cols: number[] = []
    const colCount = 5
    let rowCount = Math.ceil((customEmojiCount ?? 0) / colCount)

    for (let i = 0; i < rowCount; i++) rows.push(i)
    for (let i = 0; i < colCount; i++) cols.push(i)

    const handleClickItem = (item: string) => {
        console.log(`表情name: ${item}`)
        props.customEmojiClickListener(item)
        props.setModalVisible(false)
    }

    // 收藏表情的最大高度/宽度
    const emojiSize = 55

    const emojiWidth = (scale) => {
        // scale: 高宽比
        if (scale > 1) return Math.ceil(emojiSize / scale)
        else return emojiSize
    }

    const emojiHeight = (scale) => {
        if (scale < 1) return emojiSize * scale
        else return emojiSize
    }
    return (
        <div className={style.customEmojiPage}>
            {
                rows.map(row => {
                    return (
                        <div className={style.customEmojiPageRow} key={row}>
                            {cols.map(col => {
                                const item = customEmojis.find(item => (item.sortOrder + (row * colCount + col) + 1) === customEmojiCount)
                                return (
                                    <div className={style.customEmojiItem} key={col}>
                                        {item ?
                                            <img
                                                className={style.customEmojiItemIcon}
                                                style={{
                                                    height: item?.scale ? emojiHeight(item.scale) : emojiSize,
                                                    width: item?.scale ? emojiWidth(item.scale) : emojiSize
                                                }}
                                                src={"data:image/png;base64," + item?.emojiBase64}
                                                onClick={() => handleClickItem(item?.emojiName)} />
                                            :
                                            (customEmojiCount > (row * colCount + col)) &&
                                            <div className={style.customEmojiItemIcon} style={{ height: 55 }}>
                                                <IconEmojiLoading />
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}