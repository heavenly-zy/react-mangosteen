import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'

interface Props {
  kind: ItemKind
}

export const Tags: React.FC<Props> = ({ kind }) => {
  const tags = Array.from({ length: 99 })
  return (
    <div>
      <ol
        grid
        grid-cols="[repeat(auto-fit,48px)]"
        justify-center
        gap-x-32px
        gap-y-16px
        py-16px
        px-8px
        children-flex
        children-flex-col
        children-gap-y-8px
      >
        <li>
          <Link to={`/tags/new?kind=${kind}`}>
            <span
              w-48px
              h-48px
              rounded="50%"
              bg="#EFEFEF"
              flex
              justify-center
              items-center
              text-24px
              text="#8F4CD7"
            >
              <Icon name="add" />
            </span>
          </Link>
          <span text-12px text="#666" text-center>新增标签</span>
        </li>
        {tags.map((_tag, index) => (
          <li key={index}>
            <span h-48px rounded="50%" bg="#EFEFEF" flex justify-center items-center text-24px b-1 b="#8F4CD7" b-solid>
              {kind === 'expenses' ? '🫠' : '🥪'}
            </span>
            <span text-12px text="#666" text-center>标签</span>
          </li>
        ),
        )}
      </ol>
    </div>
  )
}
