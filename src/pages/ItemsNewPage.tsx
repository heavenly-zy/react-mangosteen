import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { Tabs } from '../components/Tabs'

export const ItemsNewPage: React.FC = () => {
  const tabItems = [
    { key: 'expenses', text: '支出', content: <div>支出</div> },
    { key: 'income', text: '收入', content: <div>收入</div> },
  ] as const
  const [tabItem, setTabItem] = useState<typeof tabItems[number]['key']>('expenses')
  return (
    <div>
      <Gradient>
        <TopNav title="记一笔" icon={<Icon name="back" />} />
      </Gradient>
      <Tabs
        tabItems={tabItems}
        headerCentered
        value={tabItem}
        onChange={setTabItem}
      />
    </div>
  )
}
