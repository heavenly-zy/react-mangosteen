import React from "react"

interface Props {
  onClick?: (e: React.MouseEvent) => void
  children?: React.ReactNode
}

export const Mask: React.FC<Props> = ({ onClick, children }) => {
  return (
    <div fixed top-0 left-0 w-full h-full className="bg-#000000:75" onClick={onClick} >{children}</div>
  )
}
