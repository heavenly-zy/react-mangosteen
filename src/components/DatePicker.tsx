import { useState } from 'react'

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
        <li>2000</li>
        <li>2001</li>
        <li>2002</li>
        <li>2003</li>
        <li>2004</li>
        <li>2005</li>
        <li>2006</li>
        <li>2007</li>
        <li>2008</li>
        <li>2009</li>
        <li>2010</li>
        <li>2000</li>
        <li>2001</li>
        <li>2002</li>
        <li>2003</li>
        <li>2004</li>
        <li>2005</li>
        <li>2006</li>
        <li>2007</li>
        <li>2008</li>
        <li>2009</li>
        <li>2010</li>
      </ol>
    </div>
  )
}
