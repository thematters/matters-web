declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare module '*.svg?url' {
  const content: {
    src: string
    height: number
    width: number
    blurWidth: number
    blurHeight: number
  }
  export default content
}

declare namespace React {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}
