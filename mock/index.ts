import type { MockMethod } from 'vite-plugin-mock'
import { summaryMock } from './summary.mock'
import { meMocks } from './me.mock'
import { itemsMocks } from './items.mock'
import { sessionMocks } from './session.mock'
import { tagsMocks } from './tags.mock'

export default [
  ...meMocks,
  ...itemsMocks,
  ...sessionMocks,
  ...tagsMocks,
  ...summaryMock,
] satisfies MockMethod[]
