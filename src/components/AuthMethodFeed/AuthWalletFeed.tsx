import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { IconMetamask22, IconWalletConnect22 } from '~/components'

import styles from './styles.module.css'

export const AuthWalletFeed = () => {
  return (
    <>
      <ul className={styles.feed}>
        <li className={styles.item}>
          <span className={styles.icon}>
            <IconMetamask22 size="mdM" />
          </span>
          <span className={styles.name}>MetaMask</span>
        </li>
        <li className={styles.item}>
          <span className={styles.icon}>
            <IconWalletConnect22 size="mdM" />
          </span>
          <span className={styles.name}>Wallet Connect</span>
        </li>
      </ul>
      <section className={styles.info}>
        <section className={styles.title}>
          <a href={PATHS.GUIDE} target="_blank">
            <FormattedMessage
              defaultMessage="What is a digital wallet?"
              description="src/components/Forms/SelectAuthMethodForm/WalletFeed.tsx"
            />
          </a>
        </section>
      </section>
    </>
  )
}
