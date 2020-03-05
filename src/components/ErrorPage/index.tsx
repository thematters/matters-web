import { NextPage } from 'next'
import React from 'react'

import { BackToHomeButton, Error, Layout } from '~/components'

interface ErrorProps {
  statusCode: number | string | null
}

export const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => (
  <Layout>
    <Error
      statusCode={statusCode}
      type={statusCode === 404 || statusCode === '404' ? 'not_found' : 'server'}
    >
      <BackToHomeButton />
    </Error>
  </Layout>
)

ErrorPage.getInitialProps = async ({ res, err }) => {
  let statusCode

  try {
    const error = err as { statusCode?: any }
    statusCode = res ? res.statusCode : error ? error.statusCode : null
  } catch (e) {
    statusCode = 500
  }

  return { statusCode }
}
