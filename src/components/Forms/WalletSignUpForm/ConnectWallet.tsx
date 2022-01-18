import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import React, { useEffect } from 'react'

import { Dialog, Form, Spacer, Translate } from '~/components'

import { WalletConnector } from '~/common/enums'
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

  const { activate, connector } = useWeb3React<ethers.providers.Web3Provider>()

  const connectorMetaMask = walletConnectors[WalletConnector.MetaMask]
  const connectorWalletConnect = walletConnectors[WalletConnector.WalletConnect]

  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const InnerForm = (
    <Form id={formId} onSubmit={submitCallback}>
      <Form.List groupName={<Translate id="connectWallet" />}>
        <Form.List.Item
          title="MetaMask"
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
          title="WalletConnect"
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'connectorWalletConnect',
            })
            setActivatingConnector(connectorWalletConnect)
            activate(connectorWalletConnect)
            submitCallback()
          }}
        />
      </Form.List>
    </Form>
  )

  return (
    <>
      {closeDialog && (
        <Dialog.Header title="loginSignUp" closeDialog={closeDialog} />
      )}

      <Dialog.Content hasGrow>
        {InnerForm}

        <Spacer size="xloose" />
      </Dialog.Content>
    </>
  )
}

export default ConnectWallet
