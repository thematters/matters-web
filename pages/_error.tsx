import { NextFunctionComponent } from 'next'
import React from 'react'

import { Button, Error, Translate } from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.error.css'

interface ErrorProps {
  statusCode: number | string | null
}

const ErrorPage: NextFunctionComponent<ErrorProps> = ({ statusCode }) => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-4 l-offset-md-2  l-col-lg-4 l-offset-lg-4">
        <Error statusCode={statusCode}>
          <Button
            bgColor="green"
            size="large"
            is="link"
            href={PATHS.HOME.href}
            as={PATHS.HOME.as}
          >
            <Translate zh_hant="返回首頁" zh_hans="返回首页" />
          </Button>
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
