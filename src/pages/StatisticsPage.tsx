import { useState } from 'react'
import useSWR from 'swr'
import { type TimeRange, TimeRangePicker } from '../components/TimeRangePicker'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Input } from '../components/Input'
import { BackIcon } from '../components/BackIcon'
import { LineChart } from './StatisticsPage/LineChart'
import { PieChart } from './StatisticsPage/PieChart'
import { Ranking } from './StatisticsPage/Ranking'
import { time } from '@/lib/time'
import { ajax } from '@/lib/ajax'

type Groups = { happen_at: string, amount: number }[]

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState<ItemKind>('expenses')

  const generateStartAndEnd = () => {
    if (timeRange === 'thisMonth') {
      const start = time().firstDayOfMonth.format('yyyy-MM-dd')
      const end = time().lastDayOfMonth.add(1, 'day').format('yyyy-MM-dd')
      return { start, end }
    }
    else {
      return { start: '', end: '' }
    }
  }
  const { start, end } = generateStartAndEnd()
  const { data: items } = useSWR(`/api/v1/items/summary?happened_after=${start}&happened_before=${end}&kind=${kind}&group_by=happen_at`, async (path: string) =>
    (await ajax.get<{ groups: Groups, total: number }>(path)).data.groups
      .map(({ happen_at, amount }) => ({ date: happen_at, value: amount })))

  const items2 = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ name: item.tag.name, value: item.amount }))
  const items3 = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign }))

  return (
    <div>
      <Gradient>
        <TopNav title="统计" icon={<BackIcon />} />
      </Gradient>
      <TimeRangePicker
        selected={timeRange}
        onSelect={setTimeRange}
        timeRanges={[
          { key: 'thisMonth', text: '本月' },
          { key: 'lastMonth', text: '上月' },
          { key: 'twoMonthsAgo', text: '两个月前' },
          { key: 'threeMonthsAgo', text: '三个月前' },
        ]}
      />
      <div p-16px>
        <Input
          type="select"
          options={[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]}
          value={kind}
          onChange={setKind}
        />
      </div>
      <LineChart className="h-120px" items={items} />
      <PieChart className="mt-16px h-260px" items={items2} />
      <Ranking className="mt-8px" items={items3} />
    </div>
  )
}
