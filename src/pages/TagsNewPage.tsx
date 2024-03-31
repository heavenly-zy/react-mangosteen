import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { BackIcon } from '../components/BackIcon'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsNewPage: React.FC = () => {
  return (
    <>
      <Gradient>
        <TopNav title="新增标签" icon={<BackIcon />} />
      </Gradient>
      <TagForm />
    </>
  )
}
