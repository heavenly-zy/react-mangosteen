import clsx from 'clsx'
import s from './Icon.module.scss'

export type IconName = 'add'

interface Props {
  className?: string
  name: IconName
}

export const Icon: React.FC<Props> = ({ name, className }) => {
  return (
    <svg className={clsx(className, s.icon)}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
