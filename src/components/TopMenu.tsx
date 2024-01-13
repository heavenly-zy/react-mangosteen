import { CurrentUser } from './TopMenu/CurrentUser'
import { Mask } from './TopMenu/Mask'
import { Menu } from './TopMenu/Menu'

interface Props {
  onClickMask?: () => void
}

export const TopMenu: React.FC<Props> = ({ onClickMask }) => {
  return (
    <>
      <Mask onClick={onClickMask} />
      <div fixed top-0 left-0 w-70vw max-w-20em h-screen flex flex-col b-3px b-solid z="[var(--z-index-top-menu)]">
        <CurrentUser className="shrink-0" />
        <Menu className="grow-1" />
      </div>
    </>
  )
}
