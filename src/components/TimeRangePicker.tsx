import styled from 'styled-components'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'

interface Props {
  selected: TimeRange
  onSelected: (selected: TimeRange) => void
}

const TimeRangeItem = styled.li<{ selected: boolean }>`
  position: relative;
  cursor: pointer;

  ${props => props.selected && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #ffffff;
      opacity: 0.5;
    }
  `}
`

const timeRanges: { key: TimeRange, text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
]

export const TimeRangePicker: React.FC<Props> = ({ selected, onSelected }) => {
  return (
    <ol flex text="#ffffff" children-px-24px children-py-12px>
      {timeRanges.map(tr => (
        <TimeRangeItem
          key={tr.key}
          selected={tr.key === selected}
          onClick={() => onSelected(tr.key)}
        >
          {tr.text}
        </TimeRangeItem>
      ))}
    </ol>
  )
}
