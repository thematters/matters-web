import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconIllustation } from '@/public/static/images/callback/Illustation.svg'
import { ReactComponent as IconLogo } from '@/public/static/images/callback/logo.svg'
import { PATHS } from '~/common/enums'
import { withIcon } from '~/components'

import styles from './styles.module.css'

interface Props {
  hasError: boolean
}

const UI = ({ hasError }: Props) => {
  return (
    <section className={styles.callback}>
      {hasError && (
        <section className={styles.error}>
          {withIcon(IconIllustation)({})}
          <section className={styles.hint}>
            <section className={styles.title}>
              <FormattedMessage
                defaultMessage="Oops！This link has expired"
                id="EwbNbl"
                description="src/views/Callback/GoogleCallback.tsx"
              />
            </section>
            <section className={styles.content}>
              <FormattedMessage
                defaultMessage="Please go to the relevant page to resend the link. You can also "
                id="GG9uXH"
                description="src/views/Callback/GoogleCallback.tsx"
              />
              <a className={styles.link} href={PATHS.HOME}>
                <FormattedMessage
                  defaultMessage="go to the homepage"
                  id="tQimre"
                  description="src/views/Callback/GoogleCallback.tsx"
                />
              </a>
            </section>
          </section>
        </section>
      )}
      {!hasError && (
        <section className={styles.logo}>{withIcon(IconLogo)({})}</section>
      )}
    </section>
  )
}

export default UI
