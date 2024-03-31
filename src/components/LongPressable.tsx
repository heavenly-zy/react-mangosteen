import type { ElementType } from 'react'
import { useCallback, useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onLongPressComplete?: () => void
  as?: ElementType
}

export const LongPressable: React.FC<Props> = ({ children, className, onClick, onLongPressComplete, as: Element = 'div' }) => {
  const touchTimer = useRef<number>()
  const touchPosition = useRef<{ x?: number, y?: number }>({ x: undefined, y: undefined })

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchTimer.current = window.setTimeout(() => {
      onLongPressComplete?.()
    }, 500)
    const { clientX: x, clientY: y } = e.touches[0]
    touchPosition.current = { x, y }
  }, [onLongPressComplete])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const { clientX: newX, clientY: newY } = e.touches[0]
    const { x, y } = touchPosition.current
    if (x === undefined || y === undefined) { return }
    const distance = Math.sqrt((newX - x) ** 2 + (newY - y) ** 2)

    // 移动距离小于 10 就视为触发了长按
    if (distance <= 10) { return }
    window.clearTimeout(touchTimer.current)
    touchTimer.current = undefined
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchTimer.current) { return }
    window.clearTimeout(touchTimer.current)
    touchTimer.current = undefined
  }, [])

  useEffect(() => {
    return () => {
      touchTimer.current && window.clearTimeout(touchTimer.current)
    }
  }, [])

  return (
    <Element
      className={className}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </Element>
  )
}
