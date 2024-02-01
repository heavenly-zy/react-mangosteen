import { Money } from '../../components/Money'

interface Props {
  className?: string
  items?: { name: string, value: number, sign: string }[]
}

const colors = ['#fac858', '#ee6666', '#73c0de', '#5470c6', '#ffbab0', '#ffa750', '#8748d3', '#53a867', '#eba953', '#91cc75']

export const Ranking: React.FC<Props> = ({ className, items }) => {
  const total = items?.reduce((result, item) => result + item.value, 0) ?? 0
  const renderItems = () => {
    return (
      items?.map((item, index) => (
        <div key={index} grid grid-cols="[48px_1fr_1fr]" grid-rows="[repeat(2,1fr)]" text-12px gap-y-6px gap-x-8px px-16px my-8px>
          <div row-start-1 col-start-1 row-end-3 col-end-2 h-48px line-height-48px text-center rounded="1\/2" bg="#EFEFEF" text-24px>
            {item.sign}
          </div>
          <div row-start-1 col-start-2 row-end-2 col-end-3 self-end>
            {`${item.name} - ${Math.round(item.value / total * 100)}%`}
          </div>
          <div row-start-1 col-start-3 row-end-2 col-end-4 text-right self-end>
            <Money value={item.value} />
          </div>
          <div row-start-2 col-start-2 row-end-3 col-end-4 h-8px self-start rounded-4px overflow-hidden bg="#CCC" relative>
            <div absolute h-full rounded-4px style={{ background: colors[index], width: `${item.value / total * 100}%` }} />
          </div>
        </div>
      ))
    )
  }
  return (
    <div className={className}>
      {items && renderItems()}
    </div>
  )
}
