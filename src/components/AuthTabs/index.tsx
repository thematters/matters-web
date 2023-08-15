import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'

import styles from './styles.module.css'

export type AuthFeedType = 'normal' | 'wallet'

interface AuthTabsProps {
  type: AuthFeedType
  setType: (type: AuthFeedType) => void
  normalText?: string | React.ReactNode
}

export const AuthTabs = ({ type, setType, normalText }: AuthTabsProps) => {
  const isNormal = type === 'normal'
  const isWallet = type === 'wallet'

  return (
    <section className={styles.tabs}>
      <Tabs noSpacing fill>
        <Tabs.Tab onClick={() => setType('normal')} selected={isNormal}>
          {!!normalText ? (
            normalText
          ) : (
            <FormattedMessage
              defaultMessage="Sign In"
              description="src/components/Forms/SelectAuthMethodForm/AuthTabs.tsx"
            />
          )}
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setType('wallet')} selected={isWallet}>
          <FormattedMessage
            defaultMessage="Wallet"
            description="src/components/Forms/SelectAuthMethodForm/AuthTabs.tsx"
          />
        </Tabs.Tab>
      </Tabs>
    </section>
  )
}
