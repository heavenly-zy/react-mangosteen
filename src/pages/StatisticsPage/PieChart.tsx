import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface Props {
  className?: string
  items?: { name: string; value: number }[]
}

export const PieChart: React.FC<Props> = ({ className, items }) => {
  const chartEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!chartEl.current) { return }
    const chartInstance = echarts.init(chartEl.current)
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: (tooltipItem: any) => {
          return `${tooltipItem.name}<br/><div flex items-center justify-between>${tooltipItem.marker}<span font-600>￥${tooltipItem.value} (${tooltipItem.percent}%)</span></div>`
        }
      },
      grid: { top: 0, left: 0, bottom: 0, right: 0 },
      series: [{ type: 'pie', radius: '80%', data: items ?? [], selectedMode: 'single' }],
    }
    chartInstance.setOption(option)
  }, [items])
  return (
    <div ref={chartEl} className={className}></div>
  )
}
