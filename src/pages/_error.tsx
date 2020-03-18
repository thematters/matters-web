import { NextPage } from 'next'
import React from 'react'

import { BackToHomeButton, Error, Layout } from '~/components'

interface ErrorProps {
  statusCode: number | undefined
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <Layout>
      <Layout.Header left={<Layout.Header.BackButton />} />

      <Error
        statusCode={statusCode}
        type={statusCode === 404 ? 'not_found' : 'server'}
      >
        <BackToHomeButton />
      </Error>
    </Layout>
  )
}

ErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
