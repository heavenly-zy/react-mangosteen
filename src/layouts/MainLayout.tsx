import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  return (
    <div>
      根页面
      <Outlet />
    </div>
  )
}
