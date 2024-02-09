import React from 'react'
import ReactDOM from 'react-dom/client'
import vhCheck from 'vh-check'
import 'virtual:uno.css'
import './styles/global.scss'
import 'virtual:svgsprites'
import App from './App'

// vh-check 用于解决在某些浏览器中页面显示不全的问题
vhCheck()

const rootDiv = document.getElementById('root')!

ReactDOM.createRoot(rootDiv).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export { rootDiv }
