import { useState } from 'react'
import { time } from '../lib/time'

interface Props {
  start?: Date
  end?: Date
  value?: Date
  itemHeight?: number
}

export const DatePicker: React.FC<Props> = ({ start, end, value, itemHeight = 36 }) => {
  const startTime = start ? time(start) : time().add(-10, 'years')
  const endTime = end ? time(end) : time().add(10, 'year')
  const valueTime = value ? time(value) : time()
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须晚于开始时间')
  }
  const years = Array.from({ length: endTime.year - startTime.year + 1 }).map((_, index) => startTime.year + index)
  const index = years.indexOf(valueTime.year)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [translateY, setTranslateY] = useState(index * -itemHeight)
  return (
    <div
      h="50vh"
      relative
      overflow-hidden
      onTouchStart={(e) => {
        setIsTouching(true)
        setLastY(e.touches[0].clientY)
      }}
      onTouchMove={(e) => {
        if (!isTouching)
          return
        const currentY = e.touches[0].clientY
        const dy = currentY - lastY
        setTranslateY(translateY + dy)
        setLastY(currentY)
      }}
      onTouchEnd={() => {
        const remainder = translateY % itemHeight
        const halfItemHeight = itemHeight / 2
        let y: number
        if (remainder > 0) {
          y = translateY + (remainder < halfItemHeight ? -remainder : itemHeight - remainder)
        }
        else {
          y = translateY - (remainder < -halfItemHeight ? itemHeight + remainder : remainder)
        }
        y = Math.min(y, 0) // y <= 0
        y = Math.max(y, (years.length - 1) * -itemHeight) // y >= (years.length - 1) * -itemHeight
        setTranslateY(y)
        setIsTouching(false)
      }}
    >
      <div style={{ height: itemHeight }} b-1 b-purple b-solid absolute top="1\/2" translate-y="-1\/2" w-full />
      <div absolute top="1\/2" style={{ transform: `translateY(${-itemHeight / 2}px)` }} b-1 b-red b-solid w-full text-center>
        <ol style={{ transform: `translateY(${translateY}px)` }}>
          {years.map(year => <li key={year} style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}>{year}</li>)}
        </ol>
      </div>
    </div>
  )
}
