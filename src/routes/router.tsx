import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Redirect } from '../components/Redirect'
import { Home } from '../pages/Home'
import { ItemsPage } from '../pages/ItemsPage'
import { SignInPage } from '../pages/SignInPage'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { TagsNewPage } from '../pages/TagsNewPage'
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
  { path: '/items/new', element: <ItemsNewPage /> },
  { path: '/tags/new', element: <TagsNewPage /> },
  { path: '/sign-in', element: <SignInPage /> },
  { path: '/charts', element: <div>统计图表</div> },
  { path: '/export', element: <div>导出数据</div> },
  { path: '/tags', element: <div>自定义标签</div> },
  { path: '/notify', element: <div>记账提醒</div> },
])
