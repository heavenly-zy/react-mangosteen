import type { MockMethod } from 'vite-plugin-mock'

export const meMock: MockMethod = {
  url: '/api/v1/me',
  method: 'get',
  timeout: 1000,
  response: (): Resource<User> => (
    {
      resource: {
        id: 1,
        email: 'xxx@qq.com',
        updated_at: '2024-01-06T00:00:00.000Z',
        created_at: '2024-01-06T00:00:00.000Z',
      },
    }
  ),
}
