import { create } from "zustand"
import type { FormErrors } from "../lib/validate"
import emojis from '@/assets/emojis.json'

interface NewTagStore {
  data: Partial<Tag>
  errors: FormErrors<Tag>
  setData: (data: Partial<Tag>) => void
  setErrors: (error: Partial<FormErrors<Tag>>) => void
}

export const useNewTagStore = create<NewTagStore>(set => (
  {
    data: {
      kind: 'expenses',
      sign: emojis[0].chars[0],
      name: ''
    },
    errors: {
      kind: [],
      sign: [],
      name: []
    },
    setData: (data: Partial<Tag>) => {
      set(state => ({
        data: { ...state.data, ...data },
      }))
    },
    setErrors: (errors: Partial<FormErrors<Tag>>) => {
      set(() => ({ errors }))
    }
  }
))