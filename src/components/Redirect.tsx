import { Navigate } from 'react-router-dom'
import { useLocalStore } from '../stores/useLocalStore'

export const Redirect: React.FC = () => {
  const { isReadWelcomes } = useLocalStore()
  if (isReadWelcomes) {
    return <Navigate to="/home" />
  } else {
    return <Navigate to="/welcome/1" />
  }
}
