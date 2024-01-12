import styled from 'styled-components'
import { Icon } from '../Icon'

interface Props {
  className?: string
}

const MenuIcon = styled(Icon)`
  width: 32px; height: 32px; margin-right: 16px;
`

export const Menu: React.FC<Props> = ({ className }) => {
  return (
    <ul
      className={className}
      bg="#ffffff"
      text-20px
      py-16px
      children-flex
      children-items-center
      children-px-16px
      children-py-8px
      children-mb-4px
    >
      <li>
        <MenuIcon name="chart" />
        统计图表
      </li>
      <li>
        <MenuIcon name="export" />
        导出数据
      </li>
      <li>
        <MenuIcon name="tag" />
        自定义标签
      </li>
      <li>
        <MenuIcon name="notify" />
        记账提醒
      </li>
    </ul>
  )
}
