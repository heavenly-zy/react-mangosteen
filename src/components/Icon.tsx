export type IconName = 'add' | 'loading'

interface Props {
  className?: string
  name: IconName
}

export const Icon: React.FC<Props> = ({ name, className }) => {
  return (
    <svg className={className} fill-current w="1.2em" h="1.2em">
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
