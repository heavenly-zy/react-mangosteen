import { useState } from 'react'
import { DatePicker } from '../../components/DatePicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'

export const ItemDate: React.FC = () => {
  const [date, setDate] = useState(new Date())
  const { popup, toggle, hide } = usePopup(
    <DatePicker onConfirm={(d) => { setDate(d); hide() }} onCancel={() => hide()} />,
  )
  return (
    <>
      {popup}
      <Icon name="calendar" className="h-24px w-24px shrink-0" />
      <span shrink-0 text-12px color="#999" onClick={toggle}>{time(date).format()}</span>
    </>
  )
}
