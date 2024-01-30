import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsNewPage: React.FC = () => {
  return (
    <>
      <Gradient>
        <TopNav title="新增标签" icon={<Icon name="back" />} />
      </Gradient>
      <TagForm />
    </>
  )
}
