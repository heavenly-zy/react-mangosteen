import { create } from 'zustand'
import type { FData, FormErrors } from '../lib/validate'
import { time } from '../lib/time'

interface NewItemStore<T extends FData> {
  data: Partial<T>
  errors: FormErrors<T>
  setData: (data: Partial<T>) => void
  setErrors: (error: Partial<FormErrors<T>>) => void
}

export const useNewItemStore = create<NewItemStore<Item>>(set => (
  {
    data: {
      kind: 'expenses',
      tag_ids: [],
      happen_at: time().format(),
      amount: 0,
    },
    errors: {
      kind: [],
      tag_ids: [],
      happen_at: [],
      amount: [],
    },
    setData: (data) => {
      set(state => ({
        data: { ...state.data, ...data },
      }))
    },
    setErrors: (errors) => {
      set(() => ({ errors }))
    },
  }
))
