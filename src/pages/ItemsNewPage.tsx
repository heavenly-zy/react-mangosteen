import React from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { Tabs } from '../components/Tabs'
import { useNewItemStore } from '../stores/useNewItemStore'
import { Tags } from './ItemsNewPage/Tags'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { ItemDate } from './ItemsNewPage/ItemDate'

export const ItemsNewPage: React.FC = () => {
  const { data, errors, setData, setErrors } = useNewItemStore()
  const tabItems = [
    {
      key: 'expenses',
      text: '支出',
      content: <Tags kind="expenses" value={data.tag_ids} onChange={ids => setData({ tag_ids: ids })} />,
    },
    {
      key: 'income',
      text: '收入',
      content: <Tags kind="income" value={data.tag_ids} onChange={ids => setData({ tag_ids: ids })} />,
    },
  ] satisfies { key: ItemKind, text: string, content: React.ReactNode }[]
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
      <div>{JSON.stringify(data)}</div>
      <ItemAmount value={data.amount} onChange={amount => setData({ amount })}>
        <ItemDate value={data.happen_at} onChange={(happen_at) => setData({ happen_at })} />
      </ItemAmount>
    </div>
  )
}
