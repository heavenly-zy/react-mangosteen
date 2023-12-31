import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { animated, useTransition } from '@react-spring/web'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logo.svg'
import { useSwipe } from '../hooks/useSwipe'

const linkMap: { [k: string]: string } = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home',
}

export const WelcomeLayout: React.FC = () => {
  const nav = useNavigate()
  const animating = useRef(false)
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
      animating.current = false
      setExtraStyle({ position: 'relative' })
    },
  })
  const mainRef = useRef<HTMLElement>(null)
  const { direction } = useSwipe(mainRef, { onTouchStart: e => e.preventDefault() })
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) return
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, nav])
  const onSkip = () => {
    localStorage.setItem('isReadWelcomes', 'yes')
  }
  return (
    <div bg="#5f34bf" h-screen flex flex-col pb-16px>
      <header shrink-0 text-center pt-64px>
        <img src={logo} w-64px />
        <h1 text="#D4D4EE" text-32px>山竹记账</h1>
      </header>
      <main className="relative shrink-1 grow-1" ref={mainRef}>
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
        <Link style={{ gridArea: '1 / 2 / 2 / 3' }} to={linkMap[location.pathname]}>下一页</Link>
        <Link style={{ gridArea: '1 / 3 / 2 / 3' }} to="/home" onClick={onSkip}>跳过</Link>
      </footer>
    </div>
  )
}
