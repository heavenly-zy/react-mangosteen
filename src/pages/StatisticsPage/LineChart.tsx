import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { getMoney } from '../../lib/get-money'

interface Props {
  className?: string
  items?: { date: string, value: number }[]
}

export const LineChart: React.FC<Props> = ({ className, items }) => {
  const chartEl = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts>()

  useEffect(() => {
    if (!chartEl.current) { return }

    // 如果已经存在 echarts 实例，则先进行销毁
    chartInstance.current && chartInstance.current.dispose()

    // 创建新的 echarts 实例
    chartInstance.current = echarts.init(chartEl.current)

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        show: true,
        formatter: (tooltipItems: any) => {
          const item = tooltipItems[0]
          const parts = item.axisValue.split('-')
          const label = `${parts[1]} 月 ${parts[2]} 日`
          return `${label}<br/><div flex items-center justify-between>${item.marker}<span font-600>${getMoney(item.data)}</span></div>`
        },
      },
      grid: { left: 16, top: 8, bottom: 24, right: 16 },
      xAxis: {
        type: 'category',
        axisLabel: {
          formatter: (label: string) => label.slice(label.indexOf('-') + 1),
        },
      },
      yAxis: { type: 'value', axisLabel: { show: false } },
      series: [{ type: 'line' }],
    }

    chartInstance.current.setOption(option)
  }, [])

  useEffect(() => {
    const option: echarts.EChartsOption = {
      xAxis: { data: items?.map(i => i.date) ?? [] },
      series: [{ data: items?.map(i => i.value) ?? [] }],
    }
    chartInstance.current?.setOption(option)
  }, [items])

  return (
    <div ref={chartEl} className={className} />
  )
}
