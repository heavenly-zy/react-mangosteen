import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { getMoney } from '../../lib/get-money'

interface Props {
  className?: string
  items?: { name: string, value: number }[]
}

export const PieChart: React.FC<Props> = ({ className, items = [] }) => {
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
        trigger: 'item',
        formatter: (tooltipItem: any) => {
          return `${tooltipItem.name}<br/>
            <div flex items-center justify-between>${tooltipItem.marker}
            <span font-600>${getMoney(tooltipItem.value)} (${tooltipItem.percent}%)</span>
          </div>`
        },
      },
      grid: { top: 0, left: 0, bottom: 0, right: 0 },
      series: [{ type: 'pie', radius: '80%', selectedMode: 'single' }],
    }
    chartInstance.current.setOption(option)
  }, [])

  useEffect(() => {
    const option: echarts.EChartsOption = { series: [{ data: items }] }
    chartInstance.current?.setOption(option)
  }, [items])

  return (
    <div ref={chartEl} className={className}></div>
  )
}
