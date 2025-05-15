import { NextPage } from 'next'
import React from 'react'

import { BackToHomeButton, Error, Layout } from '~/components'

interface ErrorProps {
  statusCode: number | undefined
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <Layout.Main>
      <Error type={statusCode === 404 ? 'not_found' : 'server'}>
        <BackToHomeButton />
      </Error>
    </Layout.Main>
  )
}

ErrorPage.getInitialProps = async (contextData) => {
  // await Sentry.captureUnderscoreErrorException(contextData)
  import('@sentry/browser').then((Sentry) => {
    Sentry.captureException(contextData)
  })

  const { res, err } = contextData
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
