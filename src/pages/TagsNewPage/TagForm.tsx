import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { hasError, validate } from '../../lib/validate'
import { Input } from '../../components/Input'
import { useNewTagStore } from '../../stores/useNewTagStore'

interface Props {
  type?: 'create' | 'edit'
}

export const TagForm: React.FC<Props> = ({ type = 'create' }) => {
  const { data, setData, errors, setErrors } = useNewTagStore()
  const [searchParams] = useSearchParams()
  const params = useParams()
  useEffect(() => {
    if (type === 'create') {
      const kind = searchParams.get('kind')
      if (!kind) {
        throw new Error('url 中缺少 kind 参数')
      }
      if (kind !== 'expenses' && kind !== 'income') {
        throw new Error('kind 必须是 expenses 或 income')
      }
      // 路由跳转成功后才进行 kind 设置
      setData({ kind })
    }
    if (type === 'edit') {
      const id = params.id
      if (!id) { throw new Error('url 中缺少 tag id') }
      console.log('id: ', id)
    }
  }, [params.id, searchParams, setData, type])
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    const _errors = validate(data, [
      { key: 'name', type: 'required', message: '标签名必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名最多四个字符' },
      { key: 'sign', type: 'required', message: '符号必填' },
    ])
    setErrors(_errors)
    if (hasError(_errors)) { return }
    console.log('发起请求')
  }
  return (
    <form flex flex-col gap-y-8px px-16px pt-32px onSubmit={onSubmit}>
      <Input label="标签名" type="text" value={data.name} onChange={name => setData({ name })} error={errors.name?.[0]} />
      <Input
        type="emoji"
        label={(
          <>
            符号&nbsp;
            <span text-24px>{data.sign}</span>
          </>
        )}
        value={data.sign}
        onChange={sign => setData({ sign })}
        error={errors.sign?.[0]}
      />
      <p text-center pb-24px>记账时长按标签，即可进行编辑</p>
      <div>
        <button x-btn>确定</button>
      </div>
    </form>
  )
}
