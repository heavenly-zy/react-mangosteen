import { create } from 'zustand'

interface FormData {
  email: string
  code: string
}

interface SignInStore {
  formData: FormData
  setFormData: (formData: Partial<FormData>) => void
}

export const useSignInStore = create<SignInStore>(set => (
  {
    formData: {
      email: '',
      code: '',
    },
    setFormData: (formData) => {
      set(state => ({
        formData: {
          ...state.formData,
          ...formData,
        },
      }))
    },
  }
))
