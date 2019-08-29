import Error from 'next/error'

import ErrorPage from '~/components/ErrorPage'

export default () => {
  if (process.browser) {
    return <ErrorPage statusCode={404} />
  }

  // @ts-ignore
  const e = new Error()
  e.code = 'ENOENT'
  throw e
}
