import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAccount, useConnect } from 'wagmi'

import IconMetaMask from '@/public/static/icons/24px/metamask.svg'
import IconWalletConnect from '@/public/static/icons/24px/walletconnect.svg'
import { EXTERNAL_LINKS, GUIDE_LINKS } from '~/common/enums'
import { PATHS } from '~/common/enums'
import { analytics, WalletType } from '~/common/utils'
import { Icon, LanguageContext, Spinner, SpinnerBlock } from '~/components'

import styles from './styles.module.css'

export interface Props {
  submitCallback: (type: WalletType) => void
  closeDialog?: () => void
  back?: () => void
  hasWalletExist?: boolean
  hasUnavailable?: boolean
  isInSupport?: boolean
}

export const AuthWalletFeed: React.FC<Props> = ({
  submitCallback,
  hasWalletExist,
  hasUnavailable,
  closeDialog,
  isInSupport,
  back,
}) => {
  const { lang } = useContext(LanguageContext)
  const { connectors, connect, pendingConnector } = useConnect()
  const { address: account, isConnecting } = useAccount()
  const [walletType, setWalletType] = useState<WalletType>('MetaMask')
  const [showLoading, setShowLoading] = useState(true)

  const injectedConnector = connectors.find((c) => c.id === 'injected')
  const walletConnectConnector = connectors.find(
    (c) => c.id === 'walletConnect'
  )
  const isMetaMaskLoading =
    isConnecting && pendingConnector?.id === injectedConnector?.id
  const isWalletConnectLoading =
    isConnecting && pendingConnector?.id === walletConnectConnector?.id

  // auto switch to next step if account is connected
  useEffect(() => {
    if (!account) {
      setShowLoading(false)
      return
    }

    submitCallback(walletType)
    setShowLoading(false)
  }, [account])

  const itemClasses = classNames({
    [styles.item]: true,
    [styles.supportItem]: isInSupport,
  })

  if (showLoading && isInSupport) {
    return <SpinnerBlock />
  }

  return (
    <>
      <ul className={styles.feed}>
        {injectedConnector?.ready ? (
          <li
            className={itemClasses}
            onClick={() => {
              analytics.trackEvent('click_button', {
                type: 'connectorMetaMask',
              })
              setWalletType('MetaMask')
              connect({ connector: injectedConnector })
            }}
            role="button"
          >
            <span className={styles.icon}>
              <Icon icon={IconMetaMask} size={22} />
            </span>
            <span className={styles.name}>MetaMask</span>
            {isMetaMaskLoading && (
              <span className={styles.right}>
                <Spinner color="grey" size={22} />
              </span>
            )}
          </li>
        ) : (
          <a href={EXTERNAL_LINKS.METAMASK} target="_blank">
            <li className={itemClasses} role="button">
              <span className={styles.icon}>
                <Icon icon={IconMetaMask} size={22} />
              </span>
              <span className={styles.name}>MetaMask</span>
            </li>
          </a>
        )}
        <li
          className={itemClasses}
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'connectorWalletConnect',
            })
            setWalletType('WalletConnect')
            connect({ connector: walletConnectConnector })
          }}
          role="button"
        >
          <span className={styles.icon}>
            <Icon icon={IconWalletConnect} size={22} />
          </span>
          <span className={styles.name}>WalletConnect</span>
          {isWalletConnectLoading && (
            <span className={styles.right}>
              <Spinner color="grey" size={22} />
            </span>
          )}
        </li>
      </ul>
      <section className={styles.info}>
        {hasWalletExist && (
          <section className={styles.errorHint}>
            <p>
              <FormattedMessage
                defaultMessage="Wallet is linked to a different account"
                id="v8dGSd"
                description="CRYPTO_WALLET_EXISTS"
              />
            </p>
            <p>
              <FormattedMessage
                defaultMessage="Sign in to that account to unlink it then try again"
                id="rqS2aA"
                description="src/components/AuthMethodFeed/AuthWalletFeed.tsx"
              />
            </p>
          </section>
        )}
        {hasUnavailable && (
          <section className={styles.errorHint}>
            <p>
              <FormattedMessage
                defaultMessage="Unavailable"
                id="rADhX5"
                description="FORBIDDEN_BY_STATE"
              />
            </p>
          </section>
        )}
        <section className={styles.title}>
          {!isInSupport && (
            <a href={PATHS.GUIDE} target="_blank">
              <FormattedMessage
                defaultMessage="What is a digital wallet?"
                id="V5OMr4"
                description="src/components/Forms/SelectAuthMethodForm/WalletFeed.tsx"
              />
            </a>
          )}
          {isInSupport && (
            <a href={GUIDE_LINKS.payment[lang]} target="_blank">
              <FormattedMessage
                defaultMessage="I don't have a wallet yet"
                id="aCTmEO"
                description="src/components/Forms/SelectAuthMethodForm/WalletFeed.tsx"
              />
            </a>
          )}
        </section>
      </section>
    </>
  )
}
