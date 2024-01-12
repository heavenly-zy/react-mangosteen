import { useContext } from 'react'
import { menuContext } from '../contexts/menuContext'
import { Icon } from './Icon'

interface Props {
  title?: string
}

export const Topnav: React.FC<Props> = ({ title = '山竹记账' }) => {
  const { visible, setVisible } = useContext(menuContext)
  return (
    <div text="#ffffff" flex items-center pt-24px pb-8px px-24px>
      <Icon name="menu" className="mr-16px h-24px w-24px" onClick={() => { setVisible(!visible) }} />
      <h1 text-24px>{title}</h1>
    </div>
  )
}
