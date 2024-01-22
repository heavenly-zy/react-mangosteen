import { useState } from 'react'

interface Props {
  className?: string
}
export const DateAndAmount: React.FC<Props> = ({ className }) => {
  const [x, setX] = useState('')
  return (
    <div b-1 b-pink b-solid className={className}>
      <input value={x} onChange={e => setX(e.target.value)} />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
      DateAndAmount
      <br />
    </div>
  )
}
