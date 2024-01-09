export type IconName = 'add' | 'loading' | 'menu'

interface Props {
  className?: string
  name: IconName
}

export const Icon: React.FC<Props> = ({ name, className }) => {
  return (
    <svg className={className} fill-current c-w="1.2em" c-h="1.2em">
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
