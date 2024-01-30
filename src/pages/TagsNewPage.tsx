import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import emojis from '@/assets/emojis.json'

export const TagsNewPage: React.FC = () => {
  const onSubmit = () => { }
  const [emoji, setEmoji] = useState(emojis[0].chars[0])
  return (
    <>
      <Gradient>
        <TopNav title="新增标签" icon={<Icon name="back" />} />
      </Gradient>
      <form x-form px-16px py-32px onSubmit={onSubmit}>
        <Input label="标签名" error="标签名太长" />
        <Input
          type="emoji"
          label={(
            <>
              符号&nbsp;
              <span text-24px>{emoji}</span>
            </>
          )}
          value={emoji}
          onChange={setEmoji}
          error="必填"
        />
        <p text-center pb-24px>记账时长按标签，即可进行编辑</p>
        <div>
          <button x-btn>确定</button>
        </div>
      </form>
    </>
  )
}
