import { getMoney } from '../lib/get-money'

interface Props {
  value?: number
}

export const Money: React.FC<Props> = ({ value = 0 }) => {
  return (
    <span>{getMoney(value)}</span>
  )
}
