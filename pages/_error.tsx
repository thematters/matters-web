import { NextFunctionComponent } from 'next'
import React from 'react'

import { Button } from '~/components'

import { PATHS } from '~/common/enums'
import IMAGE_ILLUSTRATION_EMPTY from '~/static/images/illustration-empty.svg'
import styles from './styles.error.css'

interface ErrorProps {
  statusCode: number | string | null
}

const Error: NextFunctionComponent<ErrorProps> = ({ statusCode }) => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-4 l-offset-md-2  l-col-lg-4 l-offset-lg-4">
        <section className="image">
          <img src={IMAGE_ILLUSTRATION_EMPTY} />
        </section>
        {statusCode && <h3 className="error-code">{statusCode}</h3>}
        <p className="error-message">飛船正在檢修中，請稍後看看。</p>
        <section className="error-redirect">
          <Button
            bgColor="green"
            size="large"
            is="link"
            href={PATHS.HOME.href}
            as={PATHS.HOME.as}
          >
            返回首页
          </Button>
        </section>
      </article>
      <style jsx>{styles}</style>
    </main>
  )
}

Error.getInitialProps = ({ res, err }) => {
  let statusCode

  try {
    const error = err as { statusCode?: any }
    statusCode = res ? res.statusCode : error ? error.statusCode : null
  } catch (e) {
    statusCode = 500
  }

  return { statusCode }
}

export default Error
