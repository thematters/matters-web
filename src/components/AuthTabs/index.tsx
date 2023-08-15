import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'

import styles from './styles.module.css'

export type AuthType = 'normal' | 'wallet'

interface AuthTabsProps {
  type: AuthType
  setAuthType: (type: AuthType) => void
}

export const AuthTabs = ({ type, setAuthType }: AuthTabsProps) => {
  const isNormal = type === 'normal'
  const isWallet = type === 'wallet'

  return (
    <section className={styles.tabs}>
      <Tabs noSpacing fill>
        <Tabs.Tab onClick={() => setAuthType('normal')} selected={isNormal}>
          <FormattedMessage
            defaultMessage="Sign In"
            description="src/components/Forms/SelectAuthMethodForm/AuthTabs.tsx"
          />
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setAuthType('wallet')} selected={isWallet}>
          <FormattedMessage
            defaultMessage="Wallet"
            description="src/components/Forms/SelectAuthMethodForm/AuthTabs.tsx"
          />
        </Tabs.Tab>
      </Tabs>
    </section>
  )
}
