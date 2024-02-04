interface Props {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}

export const SmsCodeInput: React.FC<Props> = ({ value, placeholder, onChange, request }) => {
  const onClick = async () => {
    if (!request) { return }
    await request()
  }
  return (
    <div flex gap-x-16px>
      <input
        x-input
        w="[calc(40%-8px)]"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
      <button type="button" x-btn w="[calc(60%-8px)]" onClick={onClick}>发送验证码</button>
    </div>
  )
}
