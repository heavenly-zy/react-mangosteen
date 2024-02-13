import { createBrowserRouter } from 'react-router-dom'
import type { AxiosError } from 'axios'
import { preload } from 'swr'
import { MainLayout } from '../layouts/MainLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Redirect } from '../components/Redirect'
import { Home } from '../pages/Home'
import { ItemsPage } from '../pages/ItemsPage'
import { SignInPage } from '../pages/SignInPage'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { TagsEditPage } from '../pages/TagsEditPage'
import { StatisticsPage } from '../pages/StatisticsPage'
import { ajax } from '../lib/ajax'
import { ErrorEmptyData, ErrorUnauthorized } from '../error'
import { ItemsPageError } from '../pages/ItemsPageError'
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
  {
    path: '/items',
    element: <ItemsPage />,
    errorElement: <ItemsPageError />,
    loader: async () => {
      const onError = (error: AxiosError) => {
        if (error.response?.status === 401) { throw new ErrorUnauthorized() }
        throw error
      }
      return preload('/api/v1/items?page=1', async (path) => {
        const response = await ajax.get<Resources<Item>>(path).catch(onError)
        if (response.data.resources.length > 0) {
          return response.data
        }
        else { throw new ErrorEmptyData() }
      })
    },
  },
  { path: '/items/new', element: <ItemsNewPage /> },
  { path: '/tags/new', element: <TagsNewPage /> },
  { path: '/tags/:id', element: <TagsEditPage /> },
  { path: '/sign-in', element: <SignInPage /> },
  { path: '/statistics', element: <StatisticsPage /> },
  { path: '/export', element: <div>导出数据</div> },
  { path: '/tags', element: <div>自定义标签</div> },
  { path: '/notify', element: <div>记账提醒</div> },
])
