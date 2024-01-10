export const ItemsSummary: React.FC = () => {
  return (
    <ol m-16px flex items-center justify-between rounded-8px bg="#252A43" px-16px py-12px text-center children-px-24px>
      <li text="#FE7275">
        <div>收入</div>
        <div>1000</div>
      </li>
      <li text="#53A867">
        <div>支出</div>
        <div>1000</div>
      </li>
      <li text="#ffffff">
        <div>净收入</div>
        <div>1000</div>
      </li>
    </ol>
  )
}
