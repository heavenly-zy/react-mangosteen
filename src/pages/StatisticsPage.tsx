import { useState } from 'react'
import { type TimeRange, TimeRangePicker } from '../components/TimeRangePicker'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  return (
    <div>
      <Gradient>
        <TopNav title="统计" icon={<Icon name="back" />} />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
    </div>
  )
}
