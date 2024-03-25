import { DatePicker } from '../../components/DatePicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'

interface Props {
  value?: string | Date
  onChange?: (date: string) => void
}

export const ItemDate: React.FC<Props> = ({ value, onChange }) => {
  const { popup, toggle, hide } = usePopup(
    <DatePicker onConfirm={(d) => { onChange?.(time(d).isoString); hide() }} onCancel={() => hide()} />,
  )
  return (
    <>
      {popup}
      <Icon name="calendar" className="h-24px w-24px shrink-0" />
      <span shrink-0 text-12px color="#999" onClick={toggle}>{time(value).format()}</span>
    </>
  )
}
