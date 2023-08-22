import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAccount, useConnect } from 'wagmi'

import { EXTERNAL_LINKS } from '~/common/enums'
import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  IconMetamask22,
  IconSpinner22,
  IconWalletConnect22,
} from '~/components'

import styles from './styles.module.css'

export const AuthWalletFeed = () => {
  // const { disconnect } = useDisconnect()
  const {
    connectors,
    connect,
    // error: connectError,
    pendingConnector,
  } = useConnect()
  const { address: account, isConnecting } = useAccount()
  // const errorMessage = connectError?.message

  const injectedConnector = connectors.find((c) => c.id === 'metaMask')
  const walletConnectConnector = connectors.find(
    (c) => c.id === 'walletConnect'
  )
  const isMetaMaskLoading =
    isConnecting && pendingConnector?.id === injectedConnector?.id
  const isWalletConnectLoading =
    isConnecting && pendingConnector?.id === walletConnectConnector?.id

  // auto switch to next step if account is connected
  useEffect(() => {
    if (!account) return

    // TODO:
    // submitCallback()
  }, [account])

  // disconnect before go back to previous step
  // TODO:
  // const onBack = () => {
  //   disconnect()

  //   // if (back) {
  //   //   back()
  //   // }
  // }

  return (
    <>
      <ul className={styles.feed}>
        {injectedConnector?.ready ? (
          <li
            className={styles.item}
            onClick={() => {
              analytics.trackEvent('click_button', {
                type: 'connectorMetaMask',
              })
              connect({ connector: injectedConnector })
            }}
            role="button"
          >
            <span className={styles.icon}>
              <IconMetamask22 size="mdM" />
            </span>
            <span className={styles.name}>MetaMask</span>
            {isMetaMaskLoading && (
              <span className={styles.right}>
                <IconSpinner22 color="grey" size="mdM" />
              </span>
            )}
          </li>
        ) : (
          <a href={EXTERNAL_LINKS.METAMASK} target="_blank">
            <li className={styles.item} role="button">
              <span className={styles.icon}>
                <IconMetamask22 size="mdM" />
              </span>
              <span className={styles.name}>MetaMask</span>
            </li>
          </a>
        )}
        <li
          className={styles.item}
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'connectorWalletConnect',
            })
            connect({ connector: walletConnectConnector })
          }}
          role="button"
        >
          <span className={styles.icon}>
            <IconWalletConnect22 size="mdM" />
          </span>
          <span className={styles.name}>Wallet Connect</span>
          {isWalletConnectLoading && (
            <span className={styles.right}>
              <IconSpinner22 color="grey" size="mdM" />
            </span>
          )}
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
