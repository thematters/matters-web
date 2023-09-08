import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { WalletType } from '~/common/utils'
import { AuthWalletFeed, Dialog, WalletAuthForm } from '~/components'

interface Props {
  closeDialog: () => void
}

type Step = 'select' | 'connect'

const RemoveWalletLoginDialogContent: React.FC<Props> = ({ closeDialog }) => {
  const [step, setStep] = useState<Step>('select')
  const [walletType, setWalletType] = useState<WalletType>('MetaMask')
  const [hasWalletExist, setHasWalletExist] = useState(false)
  const isSelect = step === 'select'
  const isConnect = step === 'connect'

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Connect wallet"
            description="src/components/Dialogs/AddWalletLoginDialog/Content.tsx"
          />
        }
      />

      {isSelect && (
        <Dialog.Content>
          <AuthWalletFeed
            submitCallback={(type: WalletType) => {
              setWalletType(type)
              setStep('connect')
            }}
            hasWalletExist={hasWalletExist}
          />
        </Dialog.Content>
      )}
      {isConnect && (
        <WalletAuthForm.Connect
          type="connect"
          purpose="dialog"
          walletType={walletType}
          closeDialog={closeDialog}
          back={() => setStep('select')}
          setHasWalletExist={() => {
            setHasWalletExist(true)
            setStep('select')
          }}
        />
      )}
    </>
  )
}

export default RemoveWalletLoginDialogContent
