import NextError from 'next/error'

import { BackToHomeButton, Error } from '~/components'

export const Throw404 = () => {
  if (process.browser) {
    return (
      <Error statusCode={404} type="not_found">
        <BackToHomeButton />
      </Error>
    )
  }

  // @ts-ignore
  const e = new NextError()
  e.code = 'ENOENT'
  throw e
}
