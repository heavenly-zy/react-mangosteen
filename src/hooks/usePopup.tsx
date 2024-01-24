import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Popup } from '../components/Popup'

export const usePopup = (content: React.ReactNode) => {
  const [visible, setVisible] = useState(false)
  const popup = ReactDOM.createPortal(
    <Popup visible={visible} onClickMask={() => setVisible(false)}>
      {content}
    </Popup>,
    document.body,
  )
  return {
    popup,
    show: () => setVisible(true),
    hide: () => setVisible(false),
    toggle: () => setVisible(!visible),
  }
}
