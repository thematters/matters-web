import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'

import { Dialog, Form, Translate } from '~/components'

import { WalletConnector } from '~/common/enums'
import { analytics, walletConnectors } from '~/common/utils'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: () => void
  closeDialog?: () => void
}

const Select: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const formId = 'wallet-login-select-form'

  const {
    activate,
    connector,
    // account, error
  } = useWeb3React<ethers.providers.Web3Provider>()

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const connectorMetaMask = walletConnectors[WalletConnector.MetaMask]
  const connectorWalletConnect = walletConnectors[WalletConnector.WalletConnect]

  const InnerForm = (
    <Form id={formId} onSubmit={submitCallback}>
      <Form.List
        groupName={
          <Translate
            zh_hans="连接加密钱包"
            zh_hant="連接加密錢包"
            en="Connect Wallet"
          />
        }
      >
        <Form.List.Item
          title={
            <Translate
              zh_hant="連接 MetaMask 錢包"
              zh_hans="連接 MetaMask 錢包"
              en="MetaMask"
            />
          }
          onClick={async () => {
            analytics.trackEvent('click_button', {
              type: 'connectorMetaMask',
            })
            setActivatingConnector(connectorMetaMask)
            activate(connectorMetaMask)
            submitCallback()
          }}
        />
        <Form.List.Item
          title={
            <Translate
              zh_hant="連接 WalletConnect"
              zh_hans="連接 WalletConnect"
              en="WalletConnect"
            />
          }
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'connectorWalletConnect',
            })
            setActivatingConnector(connectorWalletConnect)
            activate(connectorWalletConnect)
            submitCallback()
          }}
        />
        {/* TODO: error message */}
      </Form.List>
    </Form>
  )

  return (
    <>
      {closeDialog && (
        <Dialog.Header title="loginSignUp" closeDialog={closeDialog} />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Select
