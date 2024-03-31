import type { MockMethod } from 'vite-plugin-mock'
import { meMocks } from './me.mock'
import { itemsMocks } from './items.mock'
import { sessionMocks } from './session.mock'
import { tagsMocks } from './tags.mock'

export default [
  ...meMocks,
  ...itemsMocks,
  ...sessionMocks,
  ...tagsMocks
] satisfies MockMethod[]
