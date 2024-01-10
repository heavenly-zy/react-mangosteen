import { useState } from 'react'
import { type TimeRange, TimeRangePicker } from '../components/TimeRangePicker'
import { Topnav } from '../components/Topnav'
import { FloatButton } from '../components/FloatButton'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [items] = useState<Item[]>([
    {
      id: 1,
      kind: 'incomes',
      amount: 1000,
      user_id: 1,
      tag_ids: [1],
      happen_at: '2021-01-01T00:00:00.000Z',
      created_at: '2021-01-01T00:00:00.000Z',
      updated_at: '2021-01-01T00:00:00.000Z',
    },
    {
      id: 2,
      kind: 'incomes',
      amount: 1000,
      user_id: 1,
      tag_ids: [1],
      happen_at: '2021-01-01T00:00:00.000Z',
      created_at: '2021-01-01T00:00:00.000Z',
      updated_at: '2021-01-01T00:00:00.000Z',
    },
  ])
  return (
    <div>
      <div bg-gradient-to-b from="#5c33be" to="#8f4cd7">
        <Topnav />
        <TimeRangePicker selected={timeRange} onSelected={setTimeRange} />
      </div>
      <ItemsSummary />
      <ItemsList items={items} />
      <FloatButton />
    </div>
  )
}
