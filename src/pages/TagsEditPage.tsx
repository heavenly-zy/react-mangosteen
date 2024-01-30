import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsEditPage: React.FC = () => {
  return (
    <div>
      <Gradient>
        <TopNav title="查看标签" icon={<Icon name="back" />} />
      </Gradient>
      <TagForm type="edit" />
      <div px-16px py-32px>
        <button x-btn bg="#E10505">删除</button>
      </div>
    </div>
  )
}
