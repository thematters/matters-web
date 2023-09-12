import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconMatters } from '@/public/static/images/matters.svg'
import { Tabs, withIcon } from '~/components'

import styles from './styles.module.css'

export type AuthFeedType = 'normal' | 'wallet'

interface AuthTabsProps {
  purpose: 'dialog' | 'page'
  type: AuthFeedType
  setType: (type: AuthFeedType) => void
  normalText?: string | React.ReactNode
}

export const AuthTabs = ({
  purpose,
  type,
  setType,
  normalText,
}: AuthTabsProps) => {
  const isInPage = purpose === 'page'

  const isNormal = type === 'normal'
  const isWallet = type === 'wallet'

  const tabsClasses = classNames({
    [styles.tabs]: true,
    [styles.spacingTop]: !isInPage,
  })

  return (
    <section className={tabsClasses}>
      {isInPage && (
        <section className={styles.logo}>{withIcon(IconMatters)({})}</section>
      )}
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
