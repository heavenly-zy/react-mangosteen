import { animated, useSpring } from '@react-spring/web'
import { CurrentUser } from './TopMenu/CurrentUser'
import { Mask } from './TopMenu/Mask'
import { Menu } from './TopMenu/Menu'

interface Props {
  visible?: boolean
  onClickMask?: () => void
}

export const TopMenu: React.FC<Props> = ({ visible, onClickMask }) => {
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
  })
  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)',
  })
  return (
    <>
      <animated.div className={`${visible ? 'pointer-events-auto' : 'pointer-events-none'}`} style={maskStyles}>
        <Mask onClick={onClickMask} />
      </animated.div>
      <animated.div fixed top-0 left-0 w-70vw max-w-20em h-screen flex flex-col z="[var(--z-index-top-menu)]" style={menuStyles}>
        <CurrentUser className="shrink-0" />
        <Menu className="grow-1" />
      </animated.div>
    </>
  )
}
