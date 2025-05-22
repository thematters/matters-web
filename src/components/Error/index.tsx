import { useContext } from 'react'

import { ReactComponent as IconIllustrationEmpty } from '@/public/static/images/illustration-empty.svg'
import { Icon, LanguageContext } from '~/components'
import { UserLanguage } from '~/gql/graphql'

import styles from './styles.module.css'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface ErrorProps {
  error?: Error
  type?: 'network' | 'server' | 'not_found'
  message?: string | React.ReactNode
}

// FIXME: cannot use <FormattedMessage> here cuz it's outer of <TranslationProvider>
const ServerError = ({ lang }: { lang: UserLanguage }) => (
  <>
    {lang === UserLanguage.En
      ? 'Spaceship maintaining, please come back later'
      : lang === UserLanguage.ZhHans
        ? '飞船正在检修中，请稍后看看'
        : '飛船正在檢修中，請稍後看看'}
  </>
)

const NetworkError = ({ lang }: { lang: UserLanguage }) => (
  <>
    {lang === UserLanguage.En
      ? 'Connection error, please come back later'
      : lang === UserLanguage.ZhHans
        ? '星球连线出现问题，请稍后看看'
        : '星球連線出現問題，請稍後看看'}
  </>
)

const NotFound = ({ lang }: { lang: UserLanguage }) => (
  <>
    {lang === UserLanguage.En
      ? "It seems you've come to an unknown space, please go back and retry"
      : lang === UserLanguage.ZhHans
        ? '你似乎遨游到了一个未知空间，请返回重试'
        : '你似乎遨遊到了一個未知空間，請返回重試'}
  </>
)

export const Error: React.FC<React.PropsWithChildren<ErrorProps>> = ({
  type = 'network',
  message,
  error,
  children,
}) => {
  const { lang } = useContext(LanguageContext)

  return (
    <section
      className={styles.error}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <section className={styles.image}>
        <Icon
          icon={IconIllustrationEmpty}
          style={{
            width: '15rem',
            height: '15rem',
          }}
        />
      </section>

      <p className={styles.errorMessage} role="alert" aria-live="assertive">
        {message ? (
          message
        ) : type === 'not_found' ? (
          <NotFound lang={lang} />
        ) : type === 'network' ? (
          <NetworkError lang={lang} />
        ) : (
          <ServerError lang={lang} />
        )}
      </p>

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
