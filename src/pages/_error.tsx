import * as Sentry from '@sentry/nextjs'
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
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  const { res, err } = contextData
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
