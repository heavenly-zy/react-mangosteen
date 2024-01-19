import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
}

interface Options {
  beforeStart?: (e: TouchEvent) => void
  afterStart?: (e: TouchEvent) => void
  beforeMove?: (e: TouchEvent) => void
  afterMove?: (e: TouchEvent) => void
  beforeEnd?: (e: TouchEvent) => void
  afterEnd?: (e: TouchEvent) => void
}

export const useSwipe = (elementRef: RefObject<HTMLElement | null>, options?: Options) => {
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 })
  const [endPoint, setEndPoint] = useState<Point>({ x: 0, y: 0 })
  const isSwiping = useRef(false)

  const distance = useMemo(() => ({
    x: endPoint.x - startPoint.x,
    y: endPoint.y - startPoint.y,
  }), [startPoint, endPoint])

  const direction = useMemo(() => {
    const { x, y } = distance
    if (Math.abs(x) < 3 && Math.abs(y) < 3)
      return ''
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    }
    else {
      return y > 0 ? 'down' : 'up'
    }
  }, [distance])

  const onTouchStart = useCallback((e: TouchEvent) => {
    options?.beforeStart?.(e)
    isSwiping.current = true
    const point = { x: e.touches[0].screenX, y: e.touches[0].screenY }
    setStartPoint(point)
    setEndPoint(point)
    options?.afterStart?.(e)
  }, [options])

  const onTouchMove = useCallback((e: TouchEvent) => {
    options?.beforeMove?.(e)
    setEndPoint({ x: e.touches[0].screenX, y: e.touches[0].screenY })
    options?.afterMove?.(e)
  }, [options])

  const onTouchEnd = useCallback((e: TouchEvent) => {
    options?.beforeEnd?.(e)
    isSwiping.current = false
    setStartPoint({ x: 0, y: 0 })
    setEndPoint({ x: 0, y: 0 })
    options?.afterEnd?.(e)
  }, [options])

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
  }, [])

  return { isSwiping, direction, distance }
}
