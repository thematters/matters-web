declare type PathToRegExpKey = {
  name: string
  optional: boolean
  offset: number
}

declare module 'path-to-regexp' {
  export default function (
    path: string | RegExp,
    keys?: PathToRegExpKey[],
    options?: { strict?: boolean; end?: boolean; sensitive?: boolean }
  ): RegExp
}
