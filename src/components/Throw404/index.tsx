import Error from 'next/error'

import { ErrorPage } from '~/components'

export const Throw404 = () => {
  if (process.browser) {
    return <ErrorPage statusCode={404} />
  }

  // @ts-ignore
  const e = new Error()
  e.code = 'ENOENT'
  throw e
}
