import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export const FloatButton: React.FC = () => {
  return (
    <Link to="/items/new">
      <button
        w-56px
        h-56px
        bg="#5C33BE"
        rounded="50%"
        text="#ffffff"
        b-none
        fixed
        bottom-16px
        right-16px
        flex
        justify-center
        items-center
      >
        <Icon name="add" className="h-24px w-24px" />
      </button>
    </Link>
  )
}
