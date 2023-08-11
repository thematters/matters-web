import { FormattedMessage } from 'react-intl'

import { IconMetamask22, IconWalletConnect22 } from '~/components'

import styles from './styles.module.css'

const WalletFeed = () => {
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
          <FormattedMessage
            defaultMessage="What is a digital wallet?"
            description="src/components/Forms/SelectAuthMethodForm/WalletFeed.tsx"
          />
        </section>
      </section>
    </>
  )
}

export default WalletFeed
