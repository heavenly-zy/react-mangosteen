import { useNavigate, useParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { ajax } from '../lib/ajax'
import { TagForm } from './TagsNewPage/TagForm'

export const TagsEditPage: React.FC = () => {
  const { id } = useParams()
  const nav = useNavigate()

  const confirmable = (fn: () => void) => () => {
    const result = window.confirm('确定要删除吗？')
    result && fn()
  }

  const onClick = confirmable(async () => {
    if (!id) { throw new Error('id 不能为空') }
    await ajax.delete(`/api/v1/tags/${id}`).catch((error) => { window.alert('删除失败'); throw error })
    window.alert('删除成功')
    nav('/items/new')
  })

  return (
    <div>
      <Gradient>
        <TopNav title="查看标签" icon={<Icon name="back" />} />
      </Gradient>
      <TagForm type="edit" />
      <div px-16px py-32px>
        <button x-btn bg="#E10505" onClick={onClick}>删除</button>
      </div>
    </div>
  )
}
