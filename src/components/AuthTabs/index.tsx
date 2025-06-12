import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import IconLogo from '@/public/static/icons/logo.svg'
import { PATHS } from '~/common/enums'
import { Button, Icon, Media, Tabs, useRoute } from '~/components'

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
  const intl = useIntl()
  const { router, getQuery } = useRoute()
  const hasTarget = getQuery('target')

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
        <header className={styles.header}>
          <section className={styles.logo}>
            <Button
              href={PATHS.HOME}
              aria-label={intl.formatMessage({
                defaultMessage: 'Discover',
                id: 'cE4Hfw',
              })}
            >
              <Icon icon={IconLogo} />
            </Button>
          </section>

          <section className={styles.back}>
            {hasTarget && (
              <Media lessThan="md">
                <Button onClick={() => router.back()}>
                  <Icon icon={IconTimes} size={24} />
                </Button>
              </Media>
            )}
          </section>
        </header>
      )}
      <Tabs noSpacing fill>
        <Tabs.Tab onClick={() => setType('normal')} selected={isNormal}>
          {!!normalText ? (
            normalText
          ) : (
            <FormattedMessage
              defaultMessage="Sign In"
              id="3Tg548"
              description="src/components/Forms/SelectAuthMethodForm/AuthTabs.tsx"
            />
          )}
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setType('wallet')} selected={isWallet}>
          <FormattedMessage
            defaultMessage="Wallet"
            id="GHxtae"
            description="src/components/Forms/SelectAuthMethodForm/AuthTabs.tsx"
          />
        </Tabs.Tab>
      </Tabs>
    </section>
  )
}
