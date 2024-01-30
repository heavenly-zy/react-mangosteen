import { EmojiInput } from './Input/EmojiInput'

interface Props {
  label: string | React.ReactNode
  placeholder?: string
  type?: 'text' | 'emoji' | 'sms_code'
  value?: string
  onChange?: (value: string) => void
  error?: string
}

export const Input: React.FC<Props> = ({ label, placeholder, type = 'text', value, onChange, error }) => {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            x-form-input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
          />
        )
      case 'emoji':
        return <EmojiInput value={value} onChange={onChange} />
      case 'sms_code':
        return (
          <div flex gap-x-16px>
            <input
              x-form-input
              w="[calc(40%-8px)]"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={e => onChange?.(e.target.value)}
            />
            <button x-btn w="[calc(60%-8px)]">发送验证码</button>
          </div>
        )
      default:
        return null
    }
  }
  return (
    <>
      <div flex flex-col gap-y-8px>
        <span text-18px>{label}</span>
        {renderInput()}
        <span text-red text-14px>{error || '　'}</span>
      </div>
    </>
  )
}
