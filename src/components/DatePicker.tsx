import React, { useState } from 'react'
import { time } from '../lib/time'

interface ColumnProps {
  className?: string
  start?: Date
  end?: Date
  value?: Date
  itemHeight?: number
}

export const DatePickerColumn: React.FC<ColumnProps> = ({ start, end, value, itemHeight = 36, className }) => {
  const startTime = start ? time(start) : time().add(-10, 'years')
  const endTime = end ? time(end) : time().add(10, 'year')
  const valueTime = value ? time(value) : time()
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须晚于开始时间')
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 }).map((_, index) => startTime.year + index)
  const index = yearList.indexOf(valueTime.year)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [translateY, setTranslateY] = useState(index * -itemHeight)
  return (
    <div
      className={className}
      h-50vh
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
        y = Math.max(y, (yearList.length - 1) * -itemHeight) // y >= (years.length - 1) * -itemHeight
        setTranslateY(y)
        setIsTouching(false)
      }}
    >
      <div style={{ height: itemHeight }} b-b-1 b-t-1 b-l-none b-r-none b="#ebedf0" b-solid absolute top="1\/2" translate-y="-1\/2" w-full />
      <div absolute top="1\/2" style={{ transform: `translateY(${-itemHeight / 2}px)` }} w-full text-center>
        <ol style={{ transform: `translateY(${translateY}px)` }}>
          {yearList.map(year => <li key={year} style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}>{year}</li>)}
        </ol>
      </div>
    </div>
  )
}

export const DatePicker: React.FC = () => {
  return (
    <div flex>
      <DatePickerColumn className='grow-1' />
      <DatePickerColumn className='grow-1' />
      <DatePickerColumn className='grow-1' />
    </div>
  )
}
