import { animated, useSpring } from '@react-spring/web'
import { Mask } from './TopMenu/Mask'

interface Props {
  visible: boolean
  onClickMask?: () => void
  children?: React.ReactNode
}

export const Popup: React.FC<Props> = ({ visible, onClickMask, children }) => {
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
  })
  const contentStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
  })
  return (
    <>
      <animated.div className={`${visible ? 'pointer-events-auto' : 'pointer-events-none'}`} relative z="[calc(var(--z-index-mask))]" style={maskStyles}>
        <Mask onClick={onClickMask} />
      </animated.div>
      <animated.div fixed left-0 bottom-0 w-full h-50vh flex flex-col z="[calc(var(--z-index-mask)_+_1)]" style={contentStyles}>
        {children}
      </animated.div>
    </>
  )
}
