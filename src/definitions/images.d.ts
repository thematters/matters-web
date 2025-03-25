declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react'

  const url: string

  export const ReactComponent: FunctionComponent<SVGProps<HTMLOrSVGElement>>
  export default url
}

declare namespace React {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}
