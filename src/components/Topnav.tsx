import { Icon } from './Icon'

interface Props {
  title?: string
}

export const Topnav: React.FC<Props> = ({ title = '山竹记账' }) => {
  return (
    <div text="#ffffff" flex items-center pt-24px pb-8px px-24px>
      <Icon name="menu" className="mr-16px h-24px w-24px" />
      <h1 className="text-24px">{title}</h1>
    </div>
  )
}
