import { create } from 'zustand'
import type { FormErrors } from '../lib/validate'

interface FormData {
  email: string
  code: string
}

interface SignInStore {
  formData: FormData
  setFormData: (formData: Partial<FormData>) => void
  errors: FormErrors<FormData>
  setErrors: (errors: Partial<FormErrors<FormData>>) => void
}

export const useSignInStore = create<SignInStore>(set => (
  {
    formData: {
      email: '',
      code: '',
    },
    setFormData(formData) {
      set(state => ({
        formData: { ...state.formData, ...formData },
      }))
    },
    errors: {
      email: [],
      code: [],
    },
    setErrors(errors) {
      set(() => ({ errors }))
    },
  }
))
