import { Alert } from '@reach/alert'

import IMAGE_ILLUSTRATION_EMPTY from '@/public/static/images/illustration-empty.svg'
import { Translate } from '~/components'

import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

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
    en="Spaceship maintaining, please come back later"
  />
)

const NetworkError = () => (
  <Translate
    zh_hant="星球連線出現問題，請稍後看看"
    zh_hans="星球连线出现问题，请稍后看看"
    en="Connection error, please come back later"
  />
)

const NotFound = () => <Translate id="unknownAddress" />

export const Error: React.FC<React.PropsWithChildren<ErrorProps>> = ({
  statusCode,
  children,
  error,
  type = 'network',
  message,
}) => {
  const shouldShowStatusCode =
    typeof statusCode === 'string' && statusCode.length > 3

  return (
    <section className="error">
      <section className="image">
        <img src={IMAGE_ILLUSTRATION_EMPTY} alt="illustration" />
      </section>

      {shouldShowStatusCode && <h3 className="error-code">{statusCode}</h3>}

      <Alert type="assertive">
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
      </Alert>

      {children && <section className="error-redirect">{children}</section>}

      {error && !isProd && (
        <pre
          className="error-detail"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(error, null, 4),
          }}
        />
      )}
    </section>
  )
}
