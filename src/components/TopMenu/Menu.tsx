import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Icon } from '../Icon'

interface Props {
  className?: string
}

const MenuIcon = styled(Icon)`
  width: 32px; height: 32px; margin-right: 16px;
`

const menuItems = [
  { key: 'charts', icon: 'chart', text: '统计图表', to: '/charts' },
  { key: 'export', icon: 'export', text: '导出数据', to: '/export' },
  { key: 'tags', icon: 'tag', text: '自定义标签', to: '/tags' },
  { key: 'notify', icon: 'notify', text: '记账提醒', to: '/notify' },
] as const

export const Menu: React.FC<Props> = ({ className }) => {
  return (
    <ul
      className={className}
      bg="#ffffff"
      text-20px
      py-16px
      children-px-16px
      children-py-8px
      children-mb-4px
    >
      {
        menuItems.map(i => (
          <li key={i.key}>
            <Link flex items-center to={i.to}>
              <MenuIcon name={i.icon} />
              {i.text}
            </Link>
          </li>
        ))
      }
    </ul>
  )
}
