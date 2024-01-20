import styled from 'styled-components'

const TabItem = styled.li<{ selected: boolean }>`
  position: relative;
  cursor: pointer;

  ${props => props.selected && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #ffffff;
      opacity: 0.5;
    }
  `}
`

interface Props<T> {
  tabItems: { key: T, text: string }[]
  value: T
  onChange: (key: T) => void
}

export const Tabs = <T extends string>({ tabItems, value, onChange }: Props<T>) => {
  return (
    <ol flex text="#ffffff" children-px-24px children-py-12px>
      {tabItems.map(ti => (
        <TabItem
          key={ti.key}
          selected={ti.key === value}
          onClick={() => onChange(ti.key)}
        >
          {ti.text}
        </TabItem>
      ))}
    </ol>
  )
}
