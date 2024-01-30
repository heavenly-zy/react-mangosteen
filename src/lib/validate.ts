interface FData {
  [k: string]: JSONValue
}
type Rule<T> = {
  key: keyof T
  message: string
} & (
  | { type: 'required' }
  | { type: 'pattern', regex: RegExp }
  | { type: 'notEqual', value: JSONValue }
  | { type: 'length', min?: number, max?: number }
)

type Rules<T> = Rule<T>[]

type FormErrors<T extends FData> = {
  [k in keyof T]?: string[]
}

export type { Rules, Rule, FData, FormErrors }

export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
  const errors: FormErrors<T> = {}
  rules.forEach((rule) => {
    const { key, type, message } = rule
    const value = formData[key]
    switch (type) {
      case 'required':
        if (isEmpty(value)) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'pattern':
        if (!isEmpty(value) && !rule.regex.test(value.toString())) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'notEqual':
        if (!isEmpty(value) && value === rule.value) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'length':
        if (isEmpty(value)) { return }
        if (rule.min && value!.toString().length < rule.min) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        if (rule.max && value!.toString().length > rule.max) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      default:
    }
  })
  return errors
}

function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === ''
}

export function hasError(errors: Record<string, string[]>) {
  let result = false
  for (const key in errors) {
    if (errors[key]?.length > 0) {
      result = true
      break
    }
  }
  return result
}
