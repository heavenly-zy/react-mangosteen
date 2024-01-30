import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { useNewTagStore } from '../stores/useNewTagStore'
import { hasError, validate } from '../lib/validate'

export const TagsNewPage: React.FC = () => {
  const { data, setData, errors, setErrors } = useNewTagStore()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const kind = searchParams.get('kind')
    if (!kind) {
      throw new Error('url 中缺少 kind 参数')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind 必须是 expenses 或 income')
    }
    // 路由跳转成功后才进行 kind 设置
    setData({ kind })
  }, [searchParams, setData])
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
    <>
      <Gradient>
        <TopNav title="新增标签" icon={<Icon name="back" />} />
      </Gradient>
      <form x-form px-16px py-32px onSubmit={onSubmit}>
        <Input label="标签名" value={data.name} onChange={name => setData({ name })} error={errors.name?.[0]} />
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
    </>
  )
}
