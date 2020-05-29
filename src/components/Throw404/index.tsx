import { BackToHomeButton, Error as ErrorComponent } from '~/components'

/**
 * FIXME: SSR should response with HTTP 404 status code
 *
 * @see {@url https://github.com/lfades/next-with-apollo/issues/134}
 * @see {@url https://github.com/vercel/next.js/issues/4452}
 */
export const Throw404 = () => {
  return (
    <ErrorComponent statusCode={404} type="not_found">
      <BackToHomeButton />
    </ErrorComponent>
  )
}
