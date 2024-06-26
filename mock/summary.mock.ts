import type { MockMethod } from 'vite-plugin-mock'

export const summaryMock: MockMethod[] = [{
  url: '/api/v1/items/summary',
  method: 'get',
  statusCode: 200,
  response: ({ query }) => {
    if (query.group_by === 'happen_at') {
      return {
        groups: [
          { happen_at: '2024-05-06', amount: 100 },
          { happen_at: '2024-05-15', amount: 400 },
          { happen_at: '2024-05-30', amount: 900 },
        ],
        total: 900,
      }
    }
    else if (query.group_by === 'tag_id') {
      return {
        groups: [
          {
            tag_id: 672,
            tag: {
              id: 672,
              user_id: 252,
              name: 'Per.',
              sign: '😀',
              deleted_at: null,
              created_at: '2023-03-08T00:30:18.609+08:00',
              updated_at: '2023-03-08T00:30:18.609+08:00',
              kind: 'expenses',
            },
            amount: 500,
          },
          {
            tag_id: 670,
            tag: {
              id: 670,
              user_id: 252,
              name: 'Nul.',
              sign: '😡',
              deleted_at: null,
              created_at: '2023-03-08T00:30:18.605+08:00',
              updated_at: '2023-03-08T00:30:18.605+08:00',
              kind: 'expenses',
            },
            amount: 400,
          },
          {
            tag_id: 671,
            tag: {
              id: 671,
              user_id: 252,
              name: 'Non.',
              sign: '😡',
              deleted_at: null,
              created_at: '2023-03-08T00:30:18.607+08:00',
              updated_at: '2023-03-08T00:30:18.607+08:00',
              kind: 'expenses',
            },
            amount: 300,
          },
        ],
        total: 600,
      }
    }
  },
}]
