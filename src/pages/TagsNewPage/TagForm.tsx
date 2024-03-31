import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { AxiosError } from 'axios'
import useSWR from 'swr'
import type { FormErrors } from '../../lib/validate'
import { hasError, validate } from '../../lib/validate'
import { Input } from '../../components/Input'
import { useNewTagStore } from '../../stores/useNewTagStore'
import { ajax } from '../../lib/ajax'

interface Props {
  /** 默认为新增表单 */
  type?: 'new' | 'edit'
}

export const TagForm: React.FC<Props> = ({ type = 'new' }) => {
  const { data, setData, errors, setErrors } = useNewTagStore()
  const [searchParams] = useSearchParams()
  const params = useParams()
  const kind = searchParams.get('kind') ?? ''
  const id = params.id
  const nav = useNavigate()

  const { data: tag } = useSWR(id ? `/api/v1/tags/${id}` : null, async path =>
    (await ajax.get<Resource<Tag>>(path)).data.resource)

  useEffect(() => {
    // 新增 tag
    if (type === 'new') {
      if (!kind) { throw new Error('url 中缺少 kind 参数') }
      if (kind !== 'expenses' && kind !== 'income') { throw new Error('kind 必须是 expenses 或 income') }
      // 路由跳转成功后才进行 kind 设置
      setData({ kind })
    }

    // 编辑 tag
    if (type === 'edit' && tag) { setData(tag) }
  }, [kind, setData, tag, type])

  // 组件卸载时清空表单
  useEffect(() => () => {
    setData({ name: '', sign: '' })
  }, [setData])

  const errorHandler = (error: AxiosError<{ errors: FormErrors<typeof data> }>) => {
    if (!error.response) { throw error }
    const { status } = error.response
    if (status === 422) {
      const { errors } = error.response.data
      setErrors(errors)
    }
    throw error
  }

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    const _errors = validate(data, [
      { key: 'name', type: 'required', message: '标签名必填' },
      { key: 'name', type: 'length', max: 4, message: '标签名最多四个字符' },
      { key: 'sign', type: 'required', message: '符号必填' },
    ])
    setErrors(_errors)
    if (hasError(_errors)) { return }
    const tagPromise = type === 'new'
      ? ajax.post<Resource<Tag>>('/api/v1/tags', {}, data)
      : ajax.patch<Resource<Tag>>(`/api/v1/tags/${id}`, {}, data)
    await tagPromise.catch(errorHandler)
    nav(`/items/new?kind=${encodeURIComponent(kind)}`)
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
