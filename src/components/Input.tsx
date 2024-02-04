import { EmojiInput } from './Input/EmojiInput'
import { SmsCodeInput } from './Input/SmsCodeInput'

type Props<T = string> = {
  label?: string | React.ReactNode
  placeholder?: string
  value?: T
  onChange?: (value: T) => void
  error?: string
} & (
  | { type: 'text' }
  | { type: 'emoji' }
  | { type: 'sms_code'; request?: () => Promise<unknown> }
  | { type: 'select'; options: { value: T, text: string }[] }
)

export const Input = <T extends string>({ label, placeholder, type, value, onChange, error, ...restProps }: Props<T>) => {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            x-input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value as T)}
          />
        )
      case 'emoji':
        return <EmojiInput value={value} onChange={v => onChange?.(v as T)} />
      case 'sms_code':
        if (!('request' in restProps)) { return }
        return <SmsCodeInput value={value} onChange={v => onChange?.(v as T)} placeholder={placeholder} request={restProps.request} />
      case 'select':
        if (!('options' in restProps)) { return }
        return (
          <select h-36px value={value} onChange={e => onChange?.(e.target.value as T)}>
            {restProps.options.map(option =>
              <option h-36px key={option.value} value={option.value}>{option.text}</option>)}
          </select>
        )
      default:
        return null
    }
  }
  return (
    <>
      <div flex flex-col gap-y-8px>
        { label && <span text-18px>{label}</span> }
        {renderInput()}
        { type !== 'select' && <span text-red text-14px>{error || '　'}</span> }
      </div>
    </>
  )
}
