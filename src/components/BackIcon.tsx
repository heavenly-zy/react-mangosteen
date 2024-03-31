import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'

export const BackIcon: React.FC = () => {
  const nav = useNavigate()
  return (
    <Icon name="back" onClick={() => nav(-1)} />
  )
}
