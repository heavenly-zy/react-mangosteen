import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Redirect } from '../components/Redirect'
import { Home } from '../pages/Home'
import { ItemsPage } from '../pages/ItemsPage'
import { welcomeRoutes } from './welcomeRoutes'

export const router = createBrowserRouter([
  { path: '/', element: <Redirect /> },
  { path: '/home', element: <Home title="首页" /> },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      welcomeRoutes,
    ],
  },
  { path: '/items', element: <ItemsPage /> },
])
