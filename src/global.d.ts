declare const isDev: boolean

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

interface Resource<T> {
  resource: T
}

interface Resources<T> {
  resources: T[]
  pager: {
    page: number
    per_page: number
    count: number
  }
}

interface User {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}

interface Item {
  id: number
  user_id: number
  amount: number
  note?: string
  tag_ids: number[]
  happen_at: string
  created_at: string
  updated_at: string
  kind: 'expenses' | 'income'
  deleted_at?: string
}

type ItemKind = Item['kind']

type TagIds = Item['tag_ids']

interface Tag {
  id: number
  kind: ItemKind
  user_id: number
  name: string
  sign: string
  created_at: string
  updated_at: string
  deleted_at: string
}
