import { create } from 'zustand'

interface Local {
  isReadWelcomes: boolean
  setIsReadWelcomes: (read: boolean) => void
}
const init = localStorage.getItem('is-read-welcomes')

export const useLocalStore = create<Local>()(set => ({
  isReadWelcomes: init === 'yes',
  setIsReadWelcomes: (isRead: boolean) => {
    const result = isRead ? 'yes' : 'no'
    localStorage.setItem('is-read-welcomes', result)
    set({ isReadWelcomes: result === 'yes' })
  },
}))
