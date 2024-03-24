import React from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { Tabs } from '../components/Tabs'
import { useNewItemStore } from '../stores/useNewItemStore'
import { Tags } from './ItemsNewPage/Tags'
import { DateAndAmount } from './ItemsNewPage/DateAndAmount'

export const ItemsNewPage: React.FC = () => {
  const tabItems = [
    { key: 'expenses', text: '支出', content: <Tags kind="expenses" /> },
    { key: 'income', text: '收入', content: <Tags kind="income" /> },
  ] satisfies { key: ItemKind, text: string, content: React.ReactNode }[]
  const { data, error, setData, setError } = useNewItemStore()
  return (
    <div h-screen flex flex-col>
      <Gradient>
        <TopNav title="记一笔" icon={<Icon name="back" />} />
      </Gradient>
      <Tabs
        className="grow-1 overflow-hidden"
        tabItems={tabItems}
        headerCentered
        value={data.kind!}
        onChange={kind => setData({ kind })}
      />
      <DateAndAmount />
    </div>
  )
}
