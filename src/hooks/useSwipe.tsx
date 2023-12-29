import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}
export const useSwipe = (elementRef: RefObject<HTMLElement | null>, config?: Config) => {
  const [direction, setDirection] = useState<'' | 'left' | 'right'>('')
  const x = useRef(-1)
  const onTouchStart = useCallback((e: TouchEvent) => {
    config?.onTouchStart?.(e)
    x.current = e.touches[0].clientX
  }, [config])
  const onTouchMove = useCallback((e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const newX = e.touches[0].clientX
    const d = newX - x.current
    if (Math.abs(d) < 3) {
      setDirection('')
    } else if (d > 0) {
      setDirection('right')
    } else {
      setDirection('left')
    }
  }, [config])
  const onTouchEnd = useCallback((e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }, [config])
  useEffect(() => {
    const element = elementRef.current
    if (!element)
      return
    element.addEventListener('touchstart', onTouchStart)
    element.addEventListener('touchmove', onTouchMove)
    element.addEventListener('touchend', onTouchEnd)
    return () => {
      element.removeEventListener('touchstart', onTouchStart)
      element.removeEventListener('touchmove', onTouchMove)
      element.removeEventListener('touchend', onTouchEnd)
    }
  }, [elementRef, onTouchEnd, onTouchMove, onTouchStart])
  return { direction }
}
