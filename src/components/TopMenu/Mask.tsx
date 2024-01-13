import React from "react"

interface Props {
  onClick?: (e: React.MouseEvent) => void
}

export const Mask: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      fixed
      top-0
      left-0
      w="100%"
      h="100%"
      className="bg-#000000:75"
      z="[calc(var(--z-index-top-menu)_-_1)]"
      onClick={onClick}
    />
  )
}
