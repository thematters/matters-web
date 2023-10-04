import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { WalletType } from '~/common/utils'
import { AuthWalletFeed, DialogBeta, WalletAuthForm } from '~/components'

interface Props {
  closeDialog: () => void
}

type Step = 'select' | 'connect'

const AddWalletLoginDialogContent: React.FC<Props> = ({ closeDialog }) => {
  const [step, setStep] = useState<Step>('select')
  const [walletType, setWalletType] = useState<WalletType>('MetaMask')
  const [hasWalletExist, setHasWalletExist] = useState(false)
  const isSelect = step === 'select'
  const isConnect = step === 'connect'

  return (
    <>
      <DialogBeta.Header
        title={
          <FormattedMessage
            defaultMessage="Connect wallet"
            description="src/components/Dialogs/AddWalletLoginDialog/Content.tsx"
          />
        }
        leftBtn={
          <DialogBeta.TextButton
            text={<FormattedMessage defaultMessage="Close" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
        closeDialog={closeDialog}
      />

      {isSelect && (
        <>
          <DialogBeta.Content>
            <AuthWalletFeed
              submitCallback={(type: WalletType) => {
                setWalletType(type)
                setStep('connect')
              }}
              hasWalletExist={hasWalletExist}
            />
          </DialogBeta.Content>
          <DialogBeta.Footer
            smUpBtns={
              <>
                <DialogBeta.TextButton
                  text={<FormattedMessage defaultMessage="Close" />}
                  color="greyDarker"
                  onClick={closeDialog}
                />
              </>
            }
          />
        </>
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

export default AddWalletLoginDialogContent
