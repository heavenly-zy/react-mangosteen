import { useNavigate, useSearchParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { ajax } from '../lib/ajax'
import { hasError, validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'
import { Input } from '../components/Input'
import { BackIcon } from '../components/BackIcon'

export const SignInPage: React.FC = () => {
  const nav = useNavigate()
  const { formData, setFormData, errors, setErrors } = useSignInStore()
  const [search] = useSearchParams()
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const _errors = validate(formData, [
      { key: 'email', type: 'required', message: '请输入邮箱' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
    ])
    setErrors(_errors)
    if (hasError(_errors)) { return }
    await ajax.post('/api/v1/session', formData)
    const returnTo = search.get('return-to') || '/items'
    nav(returnTo)
  }
  const sendSmsCode = async () => {
    const _errors = validate({ email: formData.email }, [
      { key: 'email', type: 'required', message: '请输入邮箱' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' }
    ])
    setErrors(_errors)
    if (hasError(_errors)) { return }
    const response = await ajax.post('/api/v1/validation_codes', { email: formData.email })
    return response
  }
  return (
    <div>
      <Gradient>
        <TopNav title="登录" icon={<BackIcon />} />
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name="logo" className="h-68px w-64px" />
        <h1 text-32px text="#7878FF" font-bold>吼姆记账</h1>
      </div>
      <form flex flex-col gap-y-8px px-16px onSubmit={submitHandler}>
        <Input
          label="邮箱地址"
          type="text"
          value={formData.email}
          placeholder="请输入邮箱，然后点击发送验证码"
          onChange={email => setFormData({ email })}
          error={errors.email?.[0]}
        />
        <Input
          label="验证码"
          type="sms_code"
          value={formData.code}
          placeholder="六位数字"
          onChange={code => setFormData({ code })}
          error={errors.code?.[0]}
          request={sendSmsCode}
        />
        <div mt-100px>
          <button x-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}
