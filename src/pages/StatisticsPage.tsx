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

type DateGroups = { happen_at: string, amount: number }[]

type TagGroups = { tag_id: number, tag: Tag, amount: number }[]

const timeRangeMap: { [k in TimeRange]: number } = {
  thisYear: 0,
  custom: 0,
  thisMonth: 0,
  lastMonth: -1,
  twoMonthsAgo: -2,
  threeMonthsAgo: -3,
}

const generateApiUrl = ({ url = '/api/v1/items/summary', start, end, selectedKind, group_by }: {
  url?: string
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
  return `${url}?${params.toString()}`
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

  const { data: itemsGroupedByDate } = useSWR(generateApiUrl({ start, end, selectedKind, group_by: 'happen_at' }), async (path: string) =>
    (await ajax.get<{ groups: DateGroups, total: number }>(path)).data.groups
      .map(({ happen_at, amount }) => ({ date: happen_at, value: amount })))

  const normalizedItems = defaultDailyItems?.map(defaultItem =>
    itemsGroupedByDate?.find(item => item.date === defaultItem.date) || defaultItem,
  )

  const { data: itemsGroupedByTag } = useSWR(generateApiUrl({ start, end, selectedKind, group_by: 'tag_id' }), async (path: string) =>
    (await ajax.get<{ groups: TagGroups, total: number }>(path)).data.groups
      .map(({ tag, amount }) =>
        ({ name: tag.name, value: amount, sign: tag.sign })))

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
      <PieChart className="mt-16px h-260px" items={itemsGroupedByTag} />
      <Ranking className="mt-8px" items={itemsGroupedByTag} />
    </div>
  )
}
