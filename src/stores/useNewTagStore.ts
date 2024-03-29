import { create } from 'zustand'
import type { FData, FormErrors } from '../lib/validate'
import emojis from '@/assets/emojis.json'

interface NewTagStore<T extends FData> {
  data: Partial<T>
  errors: FormErrors<T>
  setData: (data: Partial<T>) => void
  setErrors: (error: Partial<FormErrors<T>>) => void
}

export const useNewTagStore = create<NewTagStore<Tag>>(set => (
  {
    data: {
      kind: 'expenses',
      sign: emojis[0].chars[0],
      name: '',
    },
    errors: {
      kind: [],
      sign: [],
      name: [],
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
