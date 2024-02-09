import styled from 'styled-components'
import { Icon } from './Icon'

interface Props {
  className?: string
  message?: string
}

const Div = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: spin 1.25s linear infinite;
  }
`

export const Loading: React.FC<Props> = ({ className, message = '加载中……' }) => {
  return (
    <Div className={className} fixed top-0 left-0 w-full c-h-screen flex flex-col justify-center items-center>
      <Icon name="loading" className="h-128px w-128px" />
      <p pt-8px text-lg>{message}</p>
    </Div>
  )
}
