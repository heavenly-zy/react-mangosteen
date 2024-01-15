import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

let id = 0
const createId = () => {
  id += 1
  return id
}

const createItem = (): Item => (
  {
    id: createId(),
    user_id: 1,
    amount: faker.number.int({ min: 99, max: 1000_00 }),
    tag_ids: [1, 2],
    happen_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
  }
)

const createItemList = (n: number): Item[] => Array.from({ length: n }).map(() => createItem())

const createResponse = ({ count = 10, perPage = 10, page = 1 }): Resources<Item> => {
  // 到目前为止已发送的数量
  const itemsSentSoFar = (page - 1) * perPage
  // 剩余的数量
  const remainingItems = Math.max(count - itemsSentSoFar, 0)
  // 当前应返回的数量
  const resourcesCount = Math.min(remainingItems, perPage)
  return {
    resources: createItemList(resourcesCount),
    pager: {
      page,
      per_page: perPage,
      count,
    },
  }
}

export const itemsMock: MockMethod = {
  url: '/api/v1/items',
  method: 'get',
  timeout: 1000,
  response: ({ query }) => createResponse(
    {
      count: 50,
      perPage: 10,
      page: Number.parseInt(query.page || 1),
    },
  ),
}
