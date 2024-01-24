import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Popup } from '../components/Popup'
import { rootDiv } from '../main'

export const usePopup = (content: React.ReactNode) => {
  const [visible, setVisible] = useState(false)
  const popup = ReactDOM.createPortal(
    <Popup visible={visible} onClickMask={() => setVisible(false)}>
      {content}
    </Popup>,
    rootDiv,
  )
  return {
    popup,
    show: () => setVisible(true),
    hide: () => setVisible(false),
    toggle: () => setVisible(!visible),
  }
}
