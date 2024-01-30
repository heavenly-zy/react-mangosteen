import { useState } from 'react'
import emojis from '@/assets/emojis.json'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export const EmojiInput: React.FC<Props> = ({ value, onChange }) => {
  const [emojiKind, setEmojiKind] = useState(emojis[0].name)
  return (
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
            onClick={(e) => {
              const el = e.target as HTMLElement
              if (el.tagName.toLowerCase() === 'span') {
                const char = el.textContent || ''
                onChange?.(char)
              }
            }}
          >
            {emoji.chars.map(char => (
              <span
                relative
                key={char}
                after="absolute left-0 top-0 w-full h-full b-1 b-solid b-#5C33BE rounded-4px"
                className={char === value ? 'after:content-[""]' : ''}
              >
                {char}
              </span>
            ))}
          </div>
        )
      ))}
    </div>
  )
}
