import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import { router } from './routes/router'
import 'virtual:uno.css'
import './styles/global.scss'
import 'virtual:svgsprites'

// vh-check 用于解决在某些浏览器中页面显示不全的问题
vhCheck()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
