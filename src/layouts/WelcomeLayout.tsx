import { Link, useLocation, useOutlet } from 'react-router-dom'
import { animated, useTransition } from '@react-spring/web'
import { type ReactNode, useRef, useState } from 'react'
import logo from '../assets/images/logo.svg'

const linkMap = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/start',
}

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const [extraStyle, setExtraStyle] = useState<{ position: "static" | "relative" | "absolute" | "fixed" | "sticky" }>({ position: 'relative' })
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      setExtraStyle({ position: 'relative' })
    },
  })
  return (
    <div bg="#5f34bf" h-screen flex flex-col pb-16px>
      <header shrink-0 text-center pt-64px>
        <img src={logo} w-64px />
        <h1 text="#D4D4EE" text-32px>山竹记账</h1>
      </header>
      <main className="relative shrink-1 grow-1">
        {transitions((style, pathname) => (
          <animated.div key={pathname} style={{ ...style, ...extraStyle }} className="h-100% w-100% flex p-16px">
            <div className="flex grow-1 items-center justify-center rounded-8px bg-#ffffff">
              {map.current[pathname]}
            </div>
          </animated.div>
        ),
        )}
      </main>
      <footer className="grid grid-cols-3 grid-rows-1 shrink-0 text-center text-24px text-#ffffff">
        <Link style={{ gridArea: '1 / 2 / 2 / 3' }} to={linkMap[location.pathname as keyof typeof linkMap]}>下一页</Link>
        <Link style={{ gridArea: '1 / 3 / 2 / 3' }} to="/start">跳过</Link>
      </footer>
    </div>
  )
}
