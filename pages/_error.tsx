import { NextPage } from 'next'
import React from 'react'

import { Error } from '~/components'
import BackToHomeButton from '~/components/Button/BackToHome'

import styles from './styles.error.css'

interface ErrorProps {
  statusCode: number | string | null
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-4 l-offset-md-2  l-col-lg-4 l-offset-lg-4">
        <Error
          statusCode={statusCode}
          type={
            statusCode === 404 || statusCode === '404' ? 'not_found' : 'server'
          }
        >
          <BackToHomeButton />
        </Error>
      </article>
      <style jsx>{styles}</style>
    </main>
  )
}

ErrorPage.getInitialProps = async ({ res, err }) => {
  let statusCode

  try {
    statusCode = res ? res.statusCode : err ? err.statusCode : null
  } catch (e) {
    statusCode = 500
  }

  return { statusCode } as ErrorProps
}

export default ErrorPage
