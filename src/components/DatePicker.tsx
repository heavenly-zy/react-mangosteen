import React, { useEffect, useRef, useState } from 'react'
import { time } from '../lib/time'

interface ColumnProps {
  className?: string
  itemHeight?: number
  items: number[]
  value: number
  onChange: (value: number) => void
}

export const DatePickerColumn: React.FC<ColumnProps> = ({ value, itemHeight = 36, items, className, onChange }) => {
  const [translateY, setTranslateY] = useState(0)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(0)
  useEffect(() => {
    const index = items.indexOf(value)
    setTranslateY(index * -itemHeight)
  }, [itemHeight, items, value])
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
        y = Math.max(y, (items.length - 1) * -itemHeight) // y >= (years.length - 1) * -itemHeight
        setTranslateY(y)
        setIsTouching(false)
        onChange(items[Math.abs(y / itemHeight)])
      }}
    >
      <div style={{ height: itemHeight }} b-b-1 b-t-1 b-l-none b-r-none b="#ebedf0" b-solid absolute top="1\/2" translate-y="-1\/2" w-full />
      <div absolute top="1\/2" style={{ transform: `translateY(${-itemHeight / 2}px)` }} w-full text-center>
        <ol style={{ transform: `translateY(${translateY}px)` }}>
          {items.map(item => <li key={item} style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}>{item}</li>)}
        </ol>
      </div>
    </div>
  )
}

interface Props {
  start?: Date
  end?: Date
  value?: Date
  onChange?: (value: Date) => void
}

export const DatePicker: React.FC<Props> = ({ start, end, value, onChange }) => {
  const startTime = start ? time(start) : time().add(-10, 'years')
  const endTime = end ? time(end) : time().add(10, 'year')
  const valueTime = useRef(value ? time(value) : time())
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('结束时间必须晚于开始时间')
  }
  const [, update] = useState({})
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 }).map((_, index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({ length: valueTime.current.lastDayOfMonth.day }).map((_, index) => index + 1)
  return (
    <div flex>
      <DatePickerColumn
        className="grow-1"
        items={yearList}
        value={valueTime.current.year}
        onChange={(year) => { valueTime.current.year = year; update({}); onChange?.(valueTime.current.date) }}
      />
      <DatePickerColumn
        className="grow-1"
        items={monthList}
        value={valueTime.current.month}
        onChange={(month) => { valueTime.current.month = month; update({}); onChange?.(valueTime.current.date) }}
      />
      <DatePickerColumn
        className="grow-1"
        items={dayList}
        value={valueTime.current.day}
        onChange={(day) => { valueTime.current.day = day; update({}); onChange?.(valueTime.current.date) }}
      />
    </div>
  )
}
