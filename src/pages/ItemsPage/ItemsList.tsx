interface Props {
  items: Item[]
}
export const ItemsList: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <ol>
        {items.map(item => (
          <li key={item.id} grid-cols="[auto_1fr_auto]" grid grid-rows-2 gap-x-12px border-b-1 border-b="#eeeeee" border-b-solid px-16px py-8px>
            <div
              bg="#D8D8D8"
              rounded="50%"
              col-start-1
              row-start-1
              col-end-2
              row-end-3
              h-48px
              w-48px
              flex
              items-center
              justify-center
              text-24px
            >
              😘
            </div>
            <div col-start-2 row-start-1 col-end-3 row-end-2>
              旅行
            </div>
            <div col-start-2 row-start-2 col-end-4 row-end-3 text="#999999">
              2011年1月1日
            </div>
            <div col-start-3 row-start-1 col-end-4 row-end-2 text="#53A867">
              ￥999
            </div>
          </li>
        ),
        )}
      </ol>
      <div p-16px>
        <button x-btn>加载更多</button>
      </div>
    </div>
  )
}
