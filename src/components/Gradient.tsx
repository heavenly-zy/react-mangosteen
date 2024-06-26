interface Props {
  children: React.ReactNode
}

export const Gradient = (props: Props) => <div bg-gradient-to-b from="[--main-color]" to="#8f4cd7">{props.children}</div>
