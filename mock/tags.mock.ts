import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

let id = 0
const createId = () => {
  id += 1
  return id
}
const createTag = (): Tag => ({
  id: createId(),
  name: '标签',
  sign: faker.internet.emoji(),
  user_id: 1,
  deleted_at: faker.date.past().toISOString(),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.past().toISOString(),
  kind: 'expenses',
})

const createTags = (n: number): Tag[] => Array.from({ length: n }).map(() => createTag())

const createResponse = ({ count = 10, perPage = 10, page = 1 }): Resources<Tag> => {
  // 到目前为止已发送的数量
  const itemsSentSoFar = (page - 1) * perPage
  // 剩余的数量
  const remainingItems = Math.max(count - itemsSentSoFar, 0)
  // 当前应返回的数量
  const resourcesCount = Math.min(remainingItems, perPage)
  return {
    resources: createTags(resourcesCount),
    pager: {
      page,
      per_page: perPage,
      count,
    },
  }
}

export const tagsMocks: MockMethod[] = [
  {
    url: '/api/v1/tags',
    method: 'get',
    statusCode: 200,
    response: ({ query }): Resources<Tag> => createResponse({
      count: 54,
      perPage: 50,
      page: Number.parseInt(query.page || 1),
    }),
  },
  {
    url: '/api/v1/tags',
    method: 'post',
    statusCode: 200,
    response: (): Resource<Tag> => ({ resource: createTag() }),
  },
]
