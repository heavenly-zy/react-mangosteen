import { useState } from 'react'
import { type TimeRange, TimeRangePicker } from '../components/TimeRangePicker'
import { FloatButton } from '../components/FloatButton'
import { useMenuStore } from '../stores/useMenuStore'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return (
    <div>
      <Gradient>
        <TopNav icon={<Icon name="menu" className="h-24px w-24px" onClick={() => { setVisible(!visible) }} />} />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
      <ItemsSummary />
      <ItemsList />
      <FloatButton />
      <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
    </div>
  )
}
