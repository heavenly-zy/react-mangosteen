export type IconName = 'add' | 'loading' | 'menu' | 'chart' | 'export' | 'tag' | 'notify'

interface Props {
  className?: string
  name: IconName
  onClick?: (e: React.MouseEvent) => void
}

export const Icon: React.FC<Props> = ({ name, className, onClick }) => {
  return (
    <svg onClick={onClick} className={className} fill-current c-w="1.2em" c-h="1.2em">
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
