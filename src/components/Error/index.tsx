import classNames from 'classnames'
import getConfig from 'next/config'

import { Translate } from '~/components'

import IMAGE_ILLUSTRATION_EMPTY from '~/static/images/illustration-empty.svg'

import styles from './styles.css'

const {
  publicRuntimeConfig: { ENV }
} = getConfig()
const isProd = ENV === 'production'

interface ErrorProps {
  statusCode?: number | string | null
  error?: any
  type?: 'network' | 'server' | 'not_found'
  message?: string | React.ReactNode
}

const ServerError = () => (
  <Translate
    zh_hant="飛船正在檢修中，請稍後看看"
    zh_hans="飞船正在检修中，请稍后看看"
  />
)

const NetworkError = () => (
  <Translate
    zh_hant="星球連線出現問題，請稍後看看"
    zh_hans="星球连线出现问题，请稍后看看"
  />
)

const NotFound = () => (
  <Translate
    zh_hant="你似乎遨遊到了一個未知空間，請返回重試"
    zh_hans="你似乎遨游到了一个未知空间，请返回重试"
  />
)

export const Error: React.FC<ErrorProps> = ({
  statusCode,
  children,
  error,
  type = 'network',
  message
}) => {
  const errorCodeClass = classNames({
    'error-code': true,
    small: typeof statusCode === 'string' && statusCode.length > 3
  })

  return (
    <section className="container">
      <section className="image">
        <img src={IMAGE_ILLUSTRATION_EMPTY} />
      </section>

      {statusCode && <h3 className={errorCodeClass}>{statusCode}</h3>}

      <p className="error-message">
        {message ? (
          message
        ) : type === 'not_found' ? (
          <NotFound />
        ) : type === 'network' ? (
          <NetworkError />
        ) : (
          <ServerError />
        )}
      </p>

      {children && <section className="error-redirect">{children}</section>}

      {error && !isProd && (
        <pre
          className="error-detail"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(error, null, 4)
          }}
        />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}
