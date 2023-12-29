import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../assets/images/logo.svg'

const linkMap = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/start',
}

export const WelcomeLayout: React.FC = () => {
  const location = useLocation()
  const pathname = location.pathname as keyof typeof linkMap
  const [nextPage, setNextPage] = useState(linkMap[pathname])

  useEffect(() => {
    setNextPage(linkMap[pathname])
  }, [pathname])
  return (
    <div bg="#5f34bf" h-screen flex flex-col pb-16px>
      <header shrink-0 text-center pt-64px>
        <img src={logo} w-64px />
        <h1 text="#D4D4EE" text-32px>山竹记账</h1>
      </header>
      <main shrink-1 grow-1 bg="#ffffff" m-16px rounded-8px flex justify-center items-center>
        <Outlet />
      </main>
      <footer className="grid grid-cols-3 grid-rows-1 shrink-0 text-center text-24px text-#ffffff">
        <Link style={{ gridArea: '1 / 2 / 2 / 3' }} to={nextPage}>下一页</Link>
        <Link style={{ gridArea: '1 / 3 / 2 / 3' }} to="/start">跳过</Link>
      </footer>
    </div>
  )
}
