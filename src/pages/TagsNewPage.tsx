import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import emojis from '@/assets/emojis.json'

export const TagsNewPage: React.FC = () => {
  const onSubmit = () => { }
  const [emojiKind, setEmojiKind] = useState(emojis[0].name)
  return (
    <>
      <Gradient>
        <TopNav title="新增标签" icon={<Icon name="back" />} />
      </Gradient>
      <form x-form px-16px py-32px onSubmit={onSubmit}>
        <div>
          <span x-form-label>标签名</span>
          <input x-form-input />
          <span text-red>标签名太长</span>
        </div>
        <div>
          <span text-18px>
            符号&nbsp;
            <span text-24px>😎</span>
          </span>
          <div b-1 b="#5C33BE" b-solid rounded-8px>
            <div flex p-8px gap-x-16px overflow-auto text="#999" children-whitespace-nowrap>
              {emojis.map(emoji => (
                <span
                  className={emoji.name === emojiKind ? 'text-#5C33BE' : ''}
                  key={emoji.name}
                  onClick={() => setEmojiKind(emoji.name)}
                >
                  {emoji.name}
                </span>
              ),
              )}
            </div>
            {emojis.map(emoji => (
              emoji.name === emojiKind && (
                <div
                  key={emoji.name}
                  text-24px
                  p-8px
                  h-400px
                  overflow-auto
                  grid
                  grid-cols="[repeat(auto-fit,32px)]"
                  grid-rows="[repeat(auto-fit,32px)]"
                  gap-4px
                  justify-between
                >
                  {emoji.chars.map(char => <span key={char}>{char}</span>)}
                </div>
              )
            ))}
          </div>
          <span text-red>必须选择一个符号</span>
        </div>
        <p text-center>记账时长按标签，即可进行编辑</p>
        <div>
          <button x-btn>确定</button>
        </div>
      </form>
    </>
  )
}
