import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [{
  url: '/api/v1/items/summary',
  method: 'get',
  statusCode: 200,
  response: () => ({
    groups: [
      { happen_at: '2024-05-06', tag: null, amount: 100 },
      { happen_at: '2018-05-15', tag: null, amount: 400 },
      { happen_at: '2018-05-30', tag: null, amount: 900 },
    ],
    total: 900,
  }),
}]
