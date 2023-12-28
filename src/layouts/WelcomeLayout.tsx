import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

const linkMap = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/start',
}

export const WelcomeLayout: React.FC = () => {
  return (
    <div>
      <header>
        <img src={logo} />
        <h1>山竹记账</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Link to={linkMap[location.pathname as keyof typeof linkMap]}>下一页</Link>
        <Link to="/start">跳过</Link>
      </footer>
    </div>
  )
}
