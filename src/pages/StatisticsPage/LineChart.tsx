import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface Props {
  className?: string
  items?: { date: string, value: number }[]
}

export const LineChart: React.FC<Props> = ({ className, items }) => {
  const chartEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!chartEl.current) { return }
    const chartInstance = echarts.init(chartEl.current)
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        show: true,
        formatter: (tooltipItems: any) => {
          const item = tooltipItems[0]
          const parts = item.axisValue.split('-')
          const label = `${parts[1]} 月 ${parts[2]} 日`
          return `${label}<br/><div flex items-center justify-between>${item.marker}<span font-600>${item.data} 元</span></div>`
        },
      },
      grid: { left: 16, top: 8, bottom: 24, right: 16 },
      xAxis: {
        type: 'category',
        data: items?.map(i => i.date) ?? [],
        axisLabel: {
          formatter: (label: string) => label.slice(label.indexOf('-') + 1),
        },
      },
      yAxis: { type: 'value', axisLabel: { show: false } },
      series: [{ data: items?.map(i => i.value) ?? [], type: 'line' }],
    }
    chartInstance.setOption(option)
  }, [items])
  return (
    <div ref={chartEl} className={className} />
  )
}
