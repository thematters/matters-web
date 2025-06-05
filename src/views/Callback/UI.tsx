import { FormattedMessage } from 'react-intl'

import IconIllustation from '@/public/static/images/callback/Illustation.svg'
import IconLogo from '@/public/static/images/callback/logo.svg'
import { PATHS } from '~/common/enums'
import { Icon } from '~/components'

import styles from './styles.module.css'

interface Props {
  hasError: boolean
}

const UI = ({ hasError }: Props) => {
  return (
    <section className={styles.callback}>
      {hasError && (
        <section className={styles.error}>
          <Icon icon={IconIllustation} />
          <section className={styles.hint}>
            <section className={styles.title}>
              <FormattedMessage
                defaultMessage="Oops！This link has expired"
                id="0JlaP1"
                description="src/views/Callback/UI.tsx"
              />
            </section>
            <section className={styles.content}>
              <FormattedMessage
                defaultMessage="Please go to the relevant page to resend the link. You can also "
                id="PliM8z"
                description="src/views/Callback/UI.tsx"
              />
              <a className={styles.link} href={PATHS.HOME}>
                <FormattedMessage
                  defaultMessage="go to the homepage"
                  id="aqX2Bt"
                  description="src/views/Callback/UI.tsx"
                />
              </a>
            </section>
          </section>
        </section>
      )}
      {!hasError && (
        <section className={styles.logo}>
          <Icon icon={IconLogo} />
        </section>
      )}
    </section>
  )
}

export default UI
