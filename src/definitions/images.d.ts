declare module '*.png' {
  const value: any
  export = value
}
declare module '*.png?url' {
  const value: any
  export = value
}

declare module '*.svg?sprite' {
  const value: any
  export = value
}

declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react'

  const url: string

  export const ReactComponent: FunctionComponent<SVGProps<HTMLOrSVGElement>>
  export default url
}

declare module '*.jpg' {
  const value: any
  export = value
}
declare module '*.jpg?url' {
  const value: any
  export = value
}

declare module '*.jpeg' {
  const value: any
  export = value
}

declare module '*.ico' {
  const value: any
  export = value
}
