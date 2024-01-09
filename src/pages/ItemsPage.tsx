import { TimeRangePicker } from '../components/TimeRangePicker'
import { Topnav } from '../components/Topnav'
import { FloatButton } from '../components/FloatButton'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  return (
    <div>
      <div bg-gradient-to-b from='#5c33be' to='#8f4cd7'>
        <Topnav />
        <TimeRangePicker />
      </div>
      <ItemsSummary />
      <ItemsList />
      <FloatButton />
    </div>
  )
}
