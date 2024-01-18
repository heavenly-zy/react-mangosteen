import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'

export const SignInPage: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useSignInStore()
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const _errors = validate(formData, [
      { key: 'email', type: 'required', message: '请输入邮箱' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
    ])
    setErrors(_errors)
  }
  return (
    <div>
      <Gradient>
        <TopNav title="登录" icon={<Icon name="back" />} />
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name="logo" className="h-68px w-64px" />
        <h1 text-32px text="#7878FF" font-bold>山竹记账</h1>
      </div>
      <form x-form onSubmit={submitHandler}>
        <div>
          <span x-form-label>
            邮箱地址&emsp;
            {errors.email?.[0] && <span text-red>{errors.email[0]}</span>}
          </span>
          <input
            x-form-input
            type="text"
            placeholder="请输入邮箱，然后点击发送验证码"
            value={formData.email}
            onChange={e => setFormData({ email: e.target.value })}
          />
        </div>
        <div>
          <span x-form-label>
            验证码&emsp;
            {errors.code?.[0] && <span text-red>{errors.code[0]}</span>}
          </span>
          <div flex gap-x-16px>
            <input
              x-form-input
              type="text"
              placeholder="六位数字"
              value={formData.code}
              onChange={e => setFormData({ code: e.target.value })}
            />
            <button x-btn>发送验证码</button>
          </div>
        </div>
        <div mt-100px>
          <button x-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}
