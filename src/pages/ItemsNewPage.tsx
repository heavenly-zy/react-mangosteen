import React from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { Tabs } from '../components/Tabs'
import { useNewItemStore } from '../stores/useNewItemStore'
import { hasError, validate } from '../lib/validate'
import { ajax } from '../lib/ajax'
import { Tags } from './ItemsNewPage/Tags'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { ItemDate } from './ItemsNewPage/ItemDate'

export const ItemsNewPage: React.FC = () => {
  const { data, setData, setErrors } = useNewItemStore()
  const tabItems = [
    {
      key: 'expenses',
      text: '支出',
      content: <Tags kind="expenses" value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} />,
    },
    {
      key: 'income',
      text: '收入',
      content: <Tags kind="income" value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} />,
    },
  ] satisfies { key: ItemKind, text: string, content: React.ReactNode }[]
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const errors = validate(data, [
      { key: 'kind', type: 'required', message: '请选择类型：收入或支出' },
      { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
      { key: 'happen_at', type: 'required', message: '请选择一个时间' },
      { key: 'amount', type: 'required', message: '请输入金额' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为 0' },
    ])
    setErrors(errors)
    if (hasError(errors)) {
      const message = Object.values(errors).flat().join('\n')
      window.alert(message)
      return
    }
    const response = await ajax.post<Resource<Item>>('/api/v1/items', {}, data)
    console.log(response.data.resource)
  }
  return (
    <form h-screen flex flex-col onSubmit={onSubmit}>
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
      <ItemAmount value={data.amount} onChange={amount => setData({ amount })}>
        <ItemDate value={data.happen_at} onChange={happen_at => setData({ happen_at })} />
      </ItemAmount>
    </form>
  )
}
