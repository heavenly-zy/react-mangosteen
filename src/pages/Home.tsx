import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import { ajax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'
import p from '@/assets/images/pig.svg'
import add from '@/assets/icons/add.svg'

interface Props {
  title?: string
}

export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { data: meData, isLoading: isLoadingMe } = useSWR('/api/v1/me', async path =>
    (await ajax.get<Resource<User>>(path)).data.resource)
  const { data: itemsData, isLoading: isLoadingItems } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await ajax.get<Resources<Item>>(path)).data)

  if (isLoadingMe || isLoadingItems) {
    return <div>加载中......</div>
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }
  return (
    <div>
      <div flex justify-center>
        <img my-20vh w-128px h-130px src={p} />
      </div>
      <div px-16px>
        <button h-48px w="100%" bg="#5C33BE" b-none text="#ffffff" text-18px rounded-8px>开始记账</button>
      </div>
      <button w-56px h-56px bg="#5C33BE" rounded="50%" b-none text="#ffffff" text-6xl fixed bottom-16px right-16px>
        <img src={add} max-w="100%" max-h="100%" />
      </button>
    </div>
  )
}
