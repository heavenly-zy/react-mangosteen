import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorEmptyData, ErrorUnauthorized } from '../error'

export const ItemsPageError: React.FC = () => {
  const error = useRouteError()
  const loc = useLocation()
  if (error instanceof ErrorUnauthorized) {
    const returnTo = encodeURIComponent(`${loc.pathname}${loc.search}`)
    return <Navigate to={`/sign-in?return-to=${returnTo}`} />
  }
  else if (error instanceof ErrorEmptyData) {
    return <Navigate to="/home" />
  }
  else {
    return <div>出错了</div>
  }
}
