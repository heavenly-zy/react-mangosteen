import { useState } from 'react'

const years = Array.from({ length: 25 }, (_, i) => 2000 + i)

export const DatePicker: React.FC = () => {
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [translateY, setTranslateY] = useState(0)
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
        if (isTouching) {
          const currentY = e.touches[0].clientY
          const dy = currentY - lastY
          setTranslateY(translateY + dy)
          setLastY(currentY)
        }
      }}
      onTouchEnd={() => {
        const remainder = translateY % 36
        if (remainder > 0) {
          setTranslateY(translateY + (remainder < 18 ? -remainder : 36 - remainder))
        }
        else {
          setTranslateY(translateY - (remainder < -18 ? 36 + remainder : remainder))
        }
        setIsTouching(false)
      }}
    >
      <div b-1 b-purple b-solid h-36px absolute top="[calc(50%_-_18px)]" w-full />
      <ol
        style={{ transform: `translateY(${translateY}px)` }}
        absolute
        top="[calc(50%_-_18px)]"
        w-full
        b-1
        b-red
        b-solid
        children-h-36px
        text-center
        children-leading-36px
      >
        {years.map(year => <li key={year}>{year}</li>)}
      </ol>
    </div>
  )
}
