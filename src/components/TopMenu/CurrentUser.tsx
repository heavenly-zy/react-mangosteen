import { Link } from 'react-router-dom'

interface Props {
  className?: string
}

export const CurrentUser: React.FC<Props> = ({ className }) => {
  return (
    <Link to="/sign-in" className={className} bg="[--main-color]" text="#ffffff" pt-32px pb-44px px-16px>
      <h2 text-24px>未登录用户</h2>
      <div text="#CEA1FF">点击这里登录</div>
    </Link>
  )
}
