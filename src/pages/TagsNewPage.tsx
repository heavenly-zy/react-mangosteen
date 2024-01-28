import { useState } from 'react'
import emojis from '@/assets/emojis.json'

export const TagsNewPage: React.FC = () => {
  const onSubmit = () => { }
  const [emojiKind, setEmojiKind] = useState(emojis[0].name)
  return (
    <form onSubmit={onSubmit}>
      <div>
        <span x-form-label>标签名</span>
        <input x-form-input />
        <span text-red>标签名太长</span>
      </div>
      <div>
        <span>符号 😎</span>
        <div>
          <div flex>
            {emojis.map(emoji =>
              <span key={emoji.name} onClick={() => setEmojiKind(emoji.name)}>{emoji.name}</span>,
            )}
          </div>
          <div>
            {emojis.map(emoji => (
              emoji.name === emojiKind && <div key={emoji.name}>{emoji.chars}</div>
            ))}
          </div>
        </div>
      </div>
      <p>记账时长按标签，即可进行编辑</p>
      <div>
        <button x-btn>确定</button>
      </div>
    </form>
  )
}
