import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import React, { useEffect } from 'react'
// import gql from 'graphql-tag'

import {
  Dialog,
  Form, // Layout,
  Translate,
  // useMutation,
} from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_WALLET_SIGNUP_DIALOG,
  WalletConnector,
} from '~/common/enums'
import { analytics, walletConnectors } from '~/common/utils'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
}

const ConnectWallet: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const formId = 'login-sign-up-connect-wallet-form'

  const {
    activate,
    connector,
    account, // error,
  } = useWeb3React<ethers.providers.Web3Provider>()

  const connectorMetaMask = walletConnectors[WalletConnector.MetaMask]
  const connectorWalletConnect = walletConnectors[WalletConnector.WalletConnect]

  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  /* const [generateSigningMessage] = useMutation<GenerateSigningMessage>(
    GENERATE_SIGNING_MESSAGE,
    undefined,
    {
      showToast: false,
    }
  ) */

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      // disabled={!isValid || isSubmitting}
      text={<Translate id="nextStep" />}
      // loading={isSubmitting}
    />
  )

  const InnerForm = (
    <Form id={formId} onSubmit={submitCallback}>
      <div>Connect Wallet</div>
      <Form.List spacing="xloose">
        <Form.List.Item
          title={
            <Translate
              zh_hant="連接 Metamask 錢包"
              zh_hans="連接 Metamask 錢包"
              en="connect Metamask"
            />
          }
          onClick={async () => {
            analytics.trackEvent('click_button', {
              type: 'connectorMetaMask',
            })
            setActivatingConnector(connectorMetaMask)
            activate(connectorMetaMask)

            console.log(`connect'ed via MetaMask`, account)
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_WALLET_SIGNUP_DIALOG))
          }}
        />
        <Form.List.Item
          title={
            <Translate
              zh_hant="連接 WalletConnect"
              zh_hans="連接 WalletConnect"
              en="connect WalletConnect"
            />
          }
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'connectorWalletConnect',
            })
            setActivatingConnector(connectorWalletConnect)
            activate(connectorWalletConnect)

            console.log(`connect'ed via WalletConnect`, account)
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_WALLET_SIGNUP_DIALOG))
          }}
        />
      </Form.List>
    </Form>
  )

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="loginSignUp"
          closeDialog={closeDialog}
          // left={<Layout.Header.BackButton />}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default ConnectWallet
