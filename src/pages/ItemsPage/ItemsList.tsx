import useSWRInfinite from 'swr/infinite'
import styled from 'styled-components'
import { ajax } from '../../lib/ajax'

const Tip = styled.div`
  padding: 16px;
  text-align: center;
`
const getKey = (pageIndex: number, prev: Resources<Item>) => {
  if (prev) {
    const sendCount = (prev.pager.page - 1) * prev.pager.per_page + prev.resources.length
    const count = prev.pager.count
    // 返回值为 `null` 时不会再发起请求
    if (sendCount >= count)
      return null
  }
  return `/api/v1/items?page=${pageIndex + 1}`
}
const fetcher = async (path: string) => (await ajax.get<Resources<Item>>(path)).data
export const ItemsList: React.FC = () => {
  const {
    data,
    error,
    isLoading: isLoadingInitialData,
    size: page,
    setSize: setPage,
  } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false })
  const isLoadingMore = !error && data?.[page - 1] === undefined

  // 初次加载
  if (!data) {
    return (
      <div>
        {error && <Tip>数据加载失败，请刷新页面</Tip>}
        {isLoadingInitialData && <Tip>数据加载中...</Tip>}
      </div>
    )
  }

  // 加载更多
  const lastItem = data[data.length - 1]
  const { page: lastPage, per_page, count } = lastItem.pager
  const hasMore = (lastPage - 1) * per_page + lastItem.resources.length < count
  return (
    <div>
      <ol>
        {data?.map(({ resources }) => {
          return resources.map(item => (
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
                {item.happen_at}
              </div>
              <div col-start-3 row-start-1 col-end-4 row-end-2 text="#53A867">
                ￥
                {item.amount / 100}
              </div>
            </li>
          ))
        })}
      </ol>
      {error && <Tip>数据加载失败，请刷新页面</Tip>}
      {(hasMore && isLoadingMore) && <Tip>数据加载中...</Tip>}
      {(hasMore && !isLoadingMore) && (
        <div p-16px>
          <button x-btn onClick={() => setPage(page + 1)}>加载更多</button>
        </div>
      )}
      {!hasMore && <Tip>没有更多数据了</Tip>}
    </div>
  )
}
