import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Redirect } from '../components/Redirect'
import { welcomeRoutes } from './welcomeRoutes'

export const router = createBrowserRouter([
  { path: '/', element: <Redirect /> },
  { path: '/home', element: <div>首页</div> },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      welcomeRoutes,
    ],
  },
])
