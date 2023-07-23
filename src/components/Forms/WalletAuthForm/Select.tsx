import classNames from 'classnames'
import React, { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { EXTERNAL_LINKS, GUIDE_LINKS } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Dialog,
  Form,
  IconMetaMask24,
  IconSpinner16,
  IconWalletConnect24,
  LanguageContext,
  Layout,
  Media,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import styles from './styles.module.css'

export interface FormProps {
  type?: 'connect' | 'auth'
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
  back?: () => void
}

const Hint = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Media at="sm">
        <p>
          <FormattedMessage
            defaultMessage="Have wallet questions on mobile device ? Click the "
            description="src/components/Forms/WalletAuthForm/Select.tsx"
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.mobilePayment[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage defaultMessage="tutorial" />
          </a>
        </p>
      </Media>
      <Media greaterThan="sm">
        <p>
          <FormattedMessage
            defaultMessage="Don't have a wallet yet? Check the "
            description="src/components/Forms/WalletAuthForm/Select.tsx"
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.connectWallet[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage defaultMessage="tutorial" />
          </a>
        </p>
      </Media>
    </>
  )
}

const Select: React.FC<FormProps> = ({
  type,
  purpose,
  submitCallback,
  closeDialog,
  back,
}) => {
  const viewer = useContext(ViewerContext)

  const formId = 'wallet-auth-select-form'
  const fieldMsgId = 'wall-auth-select-msg'
  const isInPage = purpose === 'page'
  const isInDialog = purpose === 'dialog'
  const isConnect = type === 'connect'

  const { disconnect } = useDisconnect()
  const {
    connectors,
    connect,
    error: connectError,
    pendingConnector,
  } = useConnect()
  const { address: account, isConnecting } = useAccount()
  const errorMessage = connectError?.message

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

    submitCallback()
  }, [account])

  // disconnect before go back to previous step
  const onBack = () => {
    disconnect()

    if (back) {
      back()
    }
  }

  const Intro = () => {
    return (
      <section className={styles.intro}>
        <Dialog.Message align="left" smUpAlign="left">
          <ul>
            <li>
              <FormattedMessage
                defaultMessage="Matters continues to provide services that combine creativity with blockchain technology. You will be the first to experience them after completing connecting wallet."
                description="src/components/Forms/WalletAuthForm/Select.tsx"
              />
            </li>
            <li>
              <strong>
                <FormattedMessage
                  defaultMessage="Wallet address will be part of your digital identity and shown in your profile page."
                  description="src/components/Forms/WalletAuthForm/Select.tsx"
                />
              </strong>
            </li>
            <li>
              <FormattedMessage
                defaultMessage="The original login via email will be kept for you. Please note that your wallet cannot be reset once it is connected because of your account security."
                description="src/components/Forms/WalletAuthForm/Select.tsx"
              />
            </li>
            <li>
              <strong>
                <FormattedMessage
                  defaultMessage="Matters will never ask your wallet key through any channel."
                  description="src/components/Forms/WalletAuthForm/Select.tsx"
                />
              </strong>
            </li>
          </ul>
        </Dialog.Message>
      </section>
    )
  }

  const formClasses = classNames({
    [styles.form]: true,
    [styles.inDialog]: isInDialog,
  })

  const InnerForm = (
    <section className={formClasses}>
      <Form id={formId} onSubmit={submitCallback}>
        {isConnect && (
          <Form.List
            groupName={
              <FormattedMessage
                defaultMessage="Account"
                description="src/components/Forms/WalletAuthForm/Select.tsx"
              />
            }
            spacingX={isInPage ? 0 : 'base'}
          >
            <Form.List.Item title="Matters ID" rightText={viewer.userName} />
          </Form.List>
        )}

        <Form.List
          groupName={<FormattedMessage defaultMessage="Connect Wallet" />}
          spacingX={isInPage ? 0 : 'base'}
        >
          {injectedConnector?.ready ? (
            <Form.List.Item
              title={
                <TextIcon
                  color="black"
                  icon={<IconMetaMask24 size="md" />}
                  size="md"
                  spacing="xtight"
                >
                  MetaMask
                </TextIcon>
              }
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'connectorMetaMask',
                })
                connect({ connector: injectedConnector })
              }}
              role="button"
              right={isMetaMaskLoading ? <IconSpinner16 color="grey" /> : null}
            />
          ) : (
            <Form.List.Item
              title={
                <TextIcon
                  color="black"
                  icon={<IconMetaMask24 size="md" />}
                  size="md"
                  spacing="xtight"
                >
                  <FormattedMessage
                    defaultMessage="Install MetaMask"
                    description="src/components/Forms/WalletAuthForm/Select.tsx"
                  />
                </TextIcon>
              }
              htmlHref={EXTERNAL_LINKS.METAMASK}
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'installMetaMask',
                })
              }}
              role="button"
            />
          )}
          <Form.List.Item
            title={
              <TextIcon
                color="black"
                icon={<IconWalletConnect24 size="md" />}
                size="md"
                spacing="xtight"
              >
                WalletConnect
              </TextIcon>
            }
            onClick={() => {
              analytics.trackEvent('click_button', {
                type: 'connectorWalletConnect',
              })
              connect({ connector: walletConnectConnector })
            }}
            role="button"
            right={
              isWalletConnectLoading ? <IconSpinner16 color="grey" /> : null
            }
          />
        </Form.List>

        <section className={styles.container}>
          <Form.Field.Footer
            fieldMsgId={fieldMsgId}
            hint={errorMessage ? undefined : <Hint />}
            error={errorMessage}
          />
        </section>
      </Form>
    </section>
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={
            <Layout.Header.Title
              id={isConnect ? 'loginWithWallet' : 'authEntries'}
            />
          }
        />

        {isConnect && <Intro />}

        <Layout.Main.Spacing>{InnerForm}</Layout.Main.Spacing>
      </>
    )
  }

  return (
    <>
      <Dialog.Header
        closeDialog={closeDialog}
        leftBtn={
          back ? (
            <Dialog.TextButton
              text={<Translate id="back" />}
              onClick={onBack}
            />
          ) : null
        }
        title={
          isConnect ? (
            <FormattedMessage defaultMessage="Connect Wallet" />
          ) : (
            <FormattedMessage defaultMessage="Enter" />
          )
        }
      />

      <Dialog.Content>
        {isConnect && <Intro />}

        {InnerForm}
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            text={back ? 'back' : 'cancel'}
            color="greyDarker"
            onClick={onBack || closeDialog}
          />
        }
      />
    </>
  )
}

export default Select
