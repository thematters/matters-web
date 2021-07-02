declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react'

  const url: string

  export const ReactComponent: FunctionComponent<SVGProps<HTMLOrSVGElement>>
  export default url
}
