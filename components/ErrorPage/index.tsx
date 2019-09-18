import { NextFunctionComponent } from 'next'
import React from 'react'

import { Error } from '~/components'
import BackToHomeButton from '~/components/Button/BackToHome'

import styles from './styles.css'

interface ErrorProps {
  statusCode: number | string | null
}

const ErrorPage: NextFunctionComponent<ErrorProps> = ({ statusCode }) => {
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

ErrorPage.getInitialProps = ({ res, err }) => {
  let statusCode

  try {
    const error = err as { statusCode?: any }
    statusCode = res ? res.statusCode : error ? error.statusCode : null
  } catch (e) {
    statusCode = 500
  }

  return { statusCode }
}

export default ErrorPage
