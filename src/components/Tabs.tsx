import styled from 'styled-components'
import clsx from 'clsx'

const TabItem = styled.li<{ selected: boolean }>`
  position: relative;

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
  tabItems: Readonly<{ key: T, text: string, content?: React.ReactNode }[]>
  value: T
  onChange: (key: T) => void
  className?: string
  headerCentered?: boolean
}

export const Tabs = <T extends string>({ tabItems, value, onChange, headerCentered = false, className }: Props<T>) => {
  return (
    <>
      <ol
        className={clsx(`${headerCentered ? 'children-flex-1 children-text-center' : ''}`, className)}
        bg="#8f4cd7"
        flex
        text="#ffffff"
        children-px-24px
        children-py-12px
      >
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
      <div>
        {tabItems.find(item => item.key === value)?.content}
      </div>
    </>
  )
}
