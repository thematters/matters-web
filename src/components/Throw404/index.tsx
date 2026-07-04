import NextHead from 'next/head'

import { BackToHomeButton, Error as ErrorComponent } from '~/components'
import { useHttpStatus } from '~/components/Context'

export const Throw404 = () => {
  const httpStatus = useHttpStatus()
  // mutating the shared object during render is how the status escapes the
  // `getDataFromTree` pass in `_app` back to `ctx.res` (real HTTP 404)
  httpStatus.statusCode = 404

  return (
    <>
      <NextHead>
        {/* `key` matches next-seo so this overrides the default robots meta */}
        <meta name="robots" content="noindex, nofollow" key="robots" />
        <meta name="googlebot" content="noindex, nofollow" key="googlebot" />
      </NextHead>
      <ErrorComponent type="not_found">
        <BackToHomeButton />
      </ErrorComponent>
    </>
  )
}
