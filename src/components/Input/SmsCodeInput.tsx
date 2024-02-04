import { useEffect, useRef, useState } from 'react'

interface Props {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}

const COUNT_DOWN = 60

export const SmsCodeInput: React.FC<Props> = ({ value, placeholder, onChange, request }) => {
  const [startedTime, setStartedTime] = useState<Date>()
  const [countdown, setCountDown] = useState(COUNT_DOWN)
  const timer = useRef<number>()
  const onClick = async () => {
    if (!request) { return }
    const result = await request()
    result && setStartedTime(new Date())
  }
  const clearTimer = () => {
    if (!timer.current) { return }
    window.clearInterval(timer.current)
    timer.current = undefined
  }
  useEffect(() => {
    if (!startedTime) {
      clearTimer()
      return
    }
    timer.current = window.setInterval(() => {
      const seconds = Math.round((new Date().getTime() - startedTime.getTime()) / 1000)
      const newCountDown = COUNT_DOWN - seconds
      if (newCountDown < 0) { setStartedTime(undefined) }
      setCountDown(newCountDown)
    }, 1000)
    return clearTimer
  }, [startedTime])
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
      {startedTime
        ? (
          <button type="button" max-w="[calc(60%-8px)]" shrink-0 x-btn disabled>
            {`${countdown} 秒后可重试`}
          </button>
          )
        : (
          <button type="button" max-w="[calc(60%-8px)]" shrink-0 x-btn onClick={onClick}>
            发送验证码
          </button>
          )}
    </div>
  )
}
