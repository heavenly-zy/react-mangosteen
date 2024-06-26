import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import useSWRInfinite from 'swr/infinite'
import styled from 'styled-components'
import { Icon } from '../../components/Icon'
import { ajax } from '../../lib/ajax'
import { LongPressable } from '../../components/LongPressable'

const Tip = styled.div`
  padding: 16px;
  text-align: center;
`

interface Props {
  kind: ItemKind
  value?: TagIds
  onChange?: (ids: TagIds) => void
}

const fetcher = async (path: string) => (await ajax.get<Resources<Tag>>(path)).data

export const Tags: React.FC<Props> = ({ kind, value, onChange }) => {
  const nav = useNavigate()

  const getKey = (pageIndex: number, prev: Resources<Item>) => {
    if (prev) {
      const sendCount = (prev.pager.page - 1) * prev.pager.per_page + prev.resources.length
      const count = prev.pager.count
      if (sendCount >= count) { return null }
    }
    return `/api/v1/tags?page=${pageIndex + 1}&kind=${kind}`
  }

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

  const renderTag = (tag: Tag) => (
    <LongPressable
      as="li"
      key={tag.id}
      onClick={() => onChange?.([tag.id])}
      onLongPressComplete={() => { nav(`/tags/${tag.id}`) }}
    >
      <span
        h-48px
        rounded="50%"
        bg="#EFEFEF"
        flex
        justify-center
        items-center
        text-24px
        b-1
        b="#8F4CD7"
        className={clsx({ 'b-solid': value?.includes(tag.id) })}
      >
        {tag.sign}
      </span>
      <span text-12px text="#666" text-center ellipsis>{tag.name}</span>
    </LongPressable>
  )

  return (
    <div>
      <ol
        grid
        grid-cols="[repeat(auto-fit,48px)]"
        justify-center
        gap-x-32px
        gap-y-16px
        py-16px
        px-8px
        children-flex
        children-flex-col
        children-gap-y-8px
      >
        <li>
          <Link to={`/tags/new?kind=${kind}`}>
            <span
              w-48px
              h-48px
              rounded="50%"
              bg="#EFEFEF"
              flex
              justify-center
              items-center
              text-24px
              text="#8F4CD7"
            >
              <Icon name="add" />
            </span>
          </Link>
          <span text-12px text="#666" text-center>新增标签</span>
        </li>
        {data?.map(({ resources }) => resources.map(tag => renderTag(tag)))}
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
