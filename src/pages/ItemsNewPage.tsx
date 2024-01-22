import React, { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { Tabs } from '../components/Tabs'
import { Tags } from './ItemsNewPage/Tags'
import { DateAndAmount } from './ItemsNewPage/DateAndAmount'

export const ItemsNewPage: React.FC = () => {
  const tabItems = [
    { key: 'expenses', text: '支出', content: <Tags kind="expenses" /> },
    { key: 'income', text: '收入', content: <Tags kind="income" /> },
  ] satisfies { key: ItemKind, text: string, content: React.ReactNode }[]
  const [tabItem, setTabItem] = useState<ItemKind>('expenses')
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
      <DateAndAmount />
    </div>
  )
}
