import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import { ajax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { FloatButton } from '../components/FloatButton'
import p from '@/assets/images/pig.svg'

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
    return <Loading />
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
      <FloatButton />
    </div>
  )
}
