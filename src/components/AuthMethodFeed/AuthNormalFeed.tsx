import { FormattedMessage } from 'react-intl'

import { PATHS } from '@/src/common/enums'
import { IconFacebook22, IconGoogle22, IconMail22, IconX22 } from '~/components'

import styles from './styles.module.css'

interface Props {
  gotoEmailSignup: () => void
  gotoEmailLogin: () => void
}

export const AuthNormalFeed = ({ gotoEmailSignup, gotoEmailLogin }: Props) => {
  return (
    <>
      <ul className={styles.feed}>
        <li className={styles.item} role="button" onClick={gotoEmailLogin}>
          <span className={styles.icon}>
            <IconMail22 size="mdM" />
          </span>
          <span className={styles.name}>
            <FormattedMessage defaultMessage="Email" />
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.icon}>
            <IconGoogle22 size="mdM" />
          </span>
          <span className={styles.name}>Google</span>
        </li>
        <li className={styles.item}>
          <span className={styles.icon}>
            <IconX22 size="mdM" />
          </span>
          <span className={styles.name}>Twitter</span>
        </li>
        <li className={styles.item}>
          <span className={styles.icon}>
            <IconFacebook22 size="mdM" />
          </span>
          <span className={styles.name}>Facebook</span>
        </li>
      </ul>
      <section className={styles.info}>
        <section className={styles.title}>
          <span className={styles.left}>
            <FormattedMessage
              defaultMessage="No account?"
              description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
            />
          </span>

          <span
            className={styles.right}
            onClick={gotoEmailSignup}
            role="button"
          >
            <FormattedMessage
              defaultMessage="Sign up with email"
              description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
            />
          </span>
        </section>
        <section className={styles.policy}>
          <FormattedMessage
            defaultMessage="Continued use indicates your agreement to"
            description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
          />
          <a href={PATHS.TOS} target="_blank">
            <FormattedMessage
              defaultMessage="the User Agreement and Privacy Policy."
              description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
            />
          </a>
        </section>
      </section>
    </>
  )
}
