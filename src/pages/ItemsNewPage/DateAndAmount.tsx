import { DatePicker } from '../../components/DatePicker'
import { Icon } from '../../components/Icon'
import { usePopup } from '../../hooks/usePopup'

export const DateAndAmount: React.FC = () => {
  const { popup, toggle } = usePopup(<DatePicker onChange={d => console.log(d.toLocaleString())} />)
  return (
    <>
      <div flex p-16px b-t-1px b-t="#ddd" b-t-solid gap-x-8px items-center>
        <Icon name="calendar" className="h-24px w-24px shrink-0" />
        <span shrink-0 text-12px color="#999" onClick={toggle}>2024-01-23</span>
        <code grow-1 text-20px text-right color="#53A867">123456789.01</code>
      </div>
      <div pt-1px grid grid-cols="[repeat(4,_1fr)]" grid-rows="[repeat(4,_56px)]" bg="#ddd" gap-1px children-b-none children-bg="#fff">
        <button row-start-1 col-start-1 row-end-2 col-end-2>1</button>
        <button row-start-1 col-start-2 row-end-2 col-end-3>2</button>
        <button row-start-1 col-start-3 row-end-2 col-end-4>3</button>
        <button row-start-2 col-start-1 row-end-3 col-end-2>4</button>
        <button row-start-2 col-start-2 row-end-3 col-end-3>5</button>
        <button row-start-2 col-start-3 row-end-3 col-end-4>6</button>
        <button row-start-3 col-start-1 row-end-4 col-end-2>7</button>
        <button row-start-3 col-start-2 row-end-4 col-end-3>8</button>
        <button row-start-3 col-start-3 row-end-4 col-end-4>9</button>
        <button row-start-4 col-start-1 row-end-5 col-end-3>0</button>
        <button row-start-4 col-start-3 row-end-5 col-end-4>.</button>
        <button row-start-1 col-start-4 row-end-3 col-end-5>清空</button>
        <button row-start-3 col-start-4 row-end-5 col-end-5>提交</button>
      </div>
      {popup}
    </>
  )
}
