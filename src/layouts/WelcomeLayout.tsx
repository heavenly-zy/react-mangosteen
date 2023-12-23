import { Outlet } from 'react-router-dom'

export const WelcomeLayout: React.FC = () => {
  return (
    <div>
      Welcome 页面
      <Outlet />
    </div>
  )
}
