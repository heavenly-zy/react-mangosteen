import { Navigate } from "react-router-dom"

export const Redirect: React.FC = () => {
  const hasRead = 'yes'
  if (hasRead === 'yes') {
    return <Navigate to="/home" />
  } else {
    return <Navigate to="/welcome/1" />
  }
}