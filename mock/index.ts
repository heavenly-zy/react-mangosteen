import type { MockMethod } from 'vite-plugin-mock'
import { meMock } from './me.mock'
import { itemsMock } from './items.mock'
import { sessionMock } from './session.mock'
import { tagsMock } from './tags.mock'

export default [
  meMock,
  itemsMock,
  sessionMock,
  tagsMock
] satisfies MockMethod[]
