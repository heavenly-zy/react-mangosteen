import type { MockMethod } from 'vite-plugin-mock'

export const sessionMocks: MockMethod[] = [
  {
    url: '/api/v1/session',
    method: 'post',
    response: (): { jwt: string } => {
      return {
        jwt: 'xxx',
      }
    },
  },
]
