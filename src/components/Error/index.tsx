import { Alert } from '@reach/alert'
import { FormattedMessage } from 'react-intl'

import IMAGE_ILLUSTRATION_EMPTY from '@/public/static/images/illustration-empty.svg'

import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface ErrorProps {
  error?: any
  type?: 'network' | 'server' | 'not_found'
  message?: string | React.ReactNode
}

const ServerError = () => (
  <FormattedMessage
    defaultMessage="Spaceship maintaining, please come back later"
    id="XHcb2q"
  />
)

const NetworkError = () => (
  <FormattedMessage
    defaultMessage="Connection error, please come back later"
    id="6OB9UA"
  />
)

const NotFound = () => (
  <FormattedMessage
    defaultMessage="It seems you've come to an unknown space, please go back and retry"
    id="rdZi0V"
  />
)

export const Error: React.FC<React.PropsWithChildren<ErrorProps>> = ({
  type = 'network',
  message,
  error,
  children,
}) => {
  return (
    <section
      className={styles.error}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <section className={styles.image}>
        <img src={IMAGE_ILLUSTRATION_EMPTY} alt="illustration" />
      </section>

      <Alert type="assertive">
        <p className={styles.errorMessage}>
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

      {children && (
        <section className={styles.errorRedirect}>{children}</section>
      )}

      {error && !isProd && (
        <pre
          className={styles.errorDetail}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(error, null, 4),
          }}
        />
      )}
    </section>
  )
}
