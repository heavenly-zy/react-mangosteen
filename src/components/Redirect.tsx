import { Navigate } from "react-router-dom"

export const Redirect: React.FC = () => {
  const isReadWelcomes = localStorage.getItem('isReadWelcomes') as 'yes' | 'no' | null
  if (isReadWelcomes === 'yes') {
    return <Navigate to="/home" />
  } else {
    return <Navigate to="/welcome/1" />
  }
}