import type { AttributifyAttributes } from 'unocss'

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {
    flex?: boolean
    relative?: boolean
    text?: string
    grid?: boolean
    before?: string
    after?: string
    shadow?: boolean
    bg?: string
    rounded?: string
    fixed?: boolean
    w?: string
    h?: string
    from?: string
    to?: string
  }
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string
    h?: string
  }
}
