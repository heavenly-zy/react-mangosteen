import { useState } from 'react'
import { type TimeRange, TimeRangePicker } from '../components/TimeRangePicker'
import { FloatButton } from '../components/FloatButton'
import { useMenuStore } from '../stores/useMenuStore'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return (
    <div>
      <div bg-gradient-to-b from="#5c33be" to="#8f4cd7">
        <TopNav />
        <TimeRangePicker selected={timeRange} onSelected={setTimeRange} />
      </div>
      <ItemsSummary />
      <ItemsList />
      <FloatButton />
      <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
    </div>
  )
}
