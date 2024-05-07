import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { type TimeRange, TimeRangePicker } from '../components/TimeRangePicker'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Input } from '../components/Input'
import { BackIcon } from '../components/BackIcon'
import { LineChart } from './StatisticsPage/LineChart'
import { PieChart } from './StatisticsPage/PieChart'
import { Ranking } from './StatisticsPage/Ranking'
import type { Time } from '@/lib/time'
import { time } from '@/lib/time'
import { ajax } from '@/lib/ajax'

type Groups = { happen_at: string, amount: number }[]

const timeRangeMap: { [k in TimeRange]: number } = {
  thisYear: 0,
  custom: 0,
  thisMonth: 0,
  lastMonth: -1,
  twoMonthsAgo: -2,
  threeMonthsAgo: -3,
}

const generateApiUrl = ({ start, end, selectedKind, group_by }: {
  start: Time
  end: Time
  selectedKind: Item['kind']
  group_by: 'happen_at' | 'tag_id'
}) => {
  const params = new URLSearchParams()
  params.append('happened_after', String(start.format()))
  params.append('happened_before', String(end.format()))
  params.append('kind', String(selectedKind))
  params.append('group_by', group_by)
  return `/api/v1/items/summary?${params.toString()}`
}

export const StatisticsPage: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('thisMonth')
  const [selectedKind, setSelectedKind] = useState<ItemKind>('expenses')

  const generateStartAndEndDate = useMemo(() => {
    const selected: Time = time().add(timeRangeMap[selectedTimeRange], 'month')
    const start = selected.firstDayOfMonth
    const end = start.lastDayOfMonth.add(1, 'day')
    return { start, end }
  }, [selectedTimeRange])

  const { start, end } = generateStartAndEndDate

  const defaultDailyItems = useMemo(() =>
    Array.from({ length: start.dayCountOfMonth }).map((_, i) => {
      const date = start.clone.add(i, 'day').format()
      return { date, value: 0 }
    }), [start])

  const { data: items } = useSWR(generateApiUrl({ start, end, selectedKind, group_by: 'happen_at' }), async (path: string) =>
    (await ajax.get<{ groups: Groups, total: number }>(path)).data.groups
      .map(({ happen_at, amount }) => ({ date: happen_at, value: amount })))

  const normalizedItems = defaultDailyItems?.map(defaultItem =>
    items?.find(item => item.date === defaultItem.date) || defaultItem,
  )

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
        selected={selectedTimeRange}
        onSelect={setSelectedTimeRange}
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
          value={selectedKind}
          onChange={setSelectedKind}
        />
      </div>
      <LineChart className="h-120px" items={normalizedItems} />
      <PieChart className="mt-16px h-260px" items={items2} />
      <Ranking className="mt-8px" items={items3} />
    </div>
  )
}
