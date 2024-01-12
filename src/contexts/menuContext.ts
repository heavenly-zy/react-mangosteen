import { createContext } from 'react'

interface Context {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const menuContext = createContext<Context>({
  visible: false,
  setVisible: () => {}
})
