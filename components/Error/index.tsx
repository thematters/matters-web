import { Translate } from '~/components'

import IMAGE_ILLUSTRATION_EMPTY from '~/static/images/illustration-empty.svg'
import styles from './styles.css'

interface ErrorProps {
  statusCode?: number | string | null
  error?: any
  type?: 'network' | 'server'
}

const isProd = process.env.NODE_ENV === 'production'

export const Error: React.FC<ErrorProps> = ({
  statusCode,
  children,
  error,
  type = 'network'
}) => {
  return (
    <section className="container">
      <section className="image">
        <img src={IMAGE_ILLUSTRATION_EMPTY} />
      </section>
      {statusCode && <h3 className="error-code">{statusCode}</h3>}
      <p className="error-message">
        {type === 'network' && (
          <Translate
            zh_hant="飛船正在檢修中，請稍後看看。"
            zh_hans="飞船正在检修中，请稍后看看。"
          />
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
