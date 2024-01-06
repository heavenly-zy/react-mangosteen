import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Redirect } from '../components/Redirect'
import { Home } from '../pages/Home'
import { welcomeRoutes } from './welcomeRoutes'

export const router = createBrowserRouter([
  { path: '/', element: <Redirect /> },
  { path: '/home', element: <Home /> },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      welcomeRoutes,
    ],
  },
  { path: '/items', element: <div>items</div> },
])
