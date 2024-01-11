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
  TableView,
  TextIcon,
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
            id="70UCEy"
            description="src/components/Forms/WalletAuthForm/Select.tsx"
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.mobilePayment[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage defaultMessage="tutorial" id="uw32VR" />
          </a>
        </p>
      </Media>
      <Media greaterThan="sm">
        <p>
          <FormattedMessage
            defaultMessage="Don't have a wallet yet? Check the "
            id="vCt85u"
            description="src/components/Forms/WalletAuthForm/Select.tsx"
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.connectWallet[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage defaultMessage="tutorial" id="uw32VR" />
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
        <Dialog.Content>
          <Dialog.Content.Message align="left" smUpAlign="left">
            <ul>
              <li>
                <FormattedMessage
                  defaultMessage="Matters continues to provide services that combine creativity with blockchain technology. You will be the first to experience them after completing connecting wallet."
                  id="HxcjQl"
                  description="src/components/Forms/WalletAuthForm/Select.tsx"
                />
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    defaultMessage="Wallet address will be part of your digital identity and shown in your profile page."
                    id="LqxIEU"
                    description="src/components/Forms/WalletAuthForm/Select.tsx"
                  />
                </strong>
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="The original login via email will be kept for you. Please note that your wallet cannot be reset once it is connected because of your account security."
                  id="UOdEqi"
                  description="src/components/Forms/WalletAuthForm/Select.tsx"
                />
              </li>
              <li>
                <strong>
                  <FormattedMessage
                    defaultMessage="Matters will never ask your wallet key through any channel."
                    id="VrOoVf"
                    description="src/components/Forms/WalletAuthForm/Select.tsx"
                  />
                </strong>
              </li>
            </ul>
          </Dialog.Content.Message>
        </Dialog.Content>
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
          <TableView
            groupName={
              <FormattedMessage
                defaultMessage="Account"
                id="v6YjIn"
                description="src/components/Forms/WalletAuthForm/Select.tsx"
              />
            }
            spacingX={isInPage ? 0 : 'base'}
          >
            <TableView.Cell title="Matters ID" rightText={viewer.userName} />
          </TableView>
        )}

        <TableView
          groupName={
            <FormattedMessage defaultMessage="Connect Wallet" id="cg1VJ2" />
          }
          spacingX={isInPage ? 0 : 'base'}
        >
          {injectedConnector?.ready ? (
            <TableView.Cell
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
            <TableView.Cell
              title={
                <TextIcon
                  color="black"
                  icon={<IconMetaMask24 size="md" />}
                  size="md"
                  spacing="xtight"
                >
                  <FormattedMessage
                    defaultMessage="Install MetaMask"
                    id="FaTb0A"
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
          <TableView.Cell
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
        </TableView>

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
            <Layout.Header.Title>
              {isConnect ? (
                <FormattedMessage defaultMessage="Connect Wallet" id="cg1VJ2" />
              ) : (
                <FormattedMessage defaultMessage="Enter" id="H8KGyc" />
              )}
            </Layout.Header.Title>
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
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={onBack}
            />
          ) : null
        }
        title={
          isConnect ? (
            <FormattedMessage defaultMessage="Connect Wallet" id="cg1VJ2" />
          ) : (
            <FormattedMessage defaultMessage="Enter" id="H8KGyc" />
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
            text={
              back ? (
                <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
              ) : (
                <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
              )
            }
            color="greyDarker"
            onClick={onBack || closeDialog}
          />
        }
      />
    </>
  )
}

export default Select
