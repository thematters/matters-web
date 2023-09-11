import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDisconnect } from 'wagmi'

import { Dialog, toast, useMutation } from '~/components'
import { RemoveWalletLoginMutation } from '~/gql/graphql'

import { REMOVE_WALLET_LOGIN } from './gql'

interface Props {
  closeDialog: () => void
}

type Step = 'confirm' | 'failure'

const RemoveWalletLoginDialogContent: React.FC<Props> = ({ closeDialog }) => {
  const [removeLogin, { loading }] = useMutation<RemoveWalletLoginMutation>(
    REMOVE_WALLET_LOGIN,
    undefined,
    {
      showToast: false,
    }
  )

  const { disconnect } = useDisconnect()

  const [step, setStep] = useState<Step>('confirm')
  const isConfirm = step === 'confirm'
  const isFailure = step === 'failure'

  const remove = async () => {
    try {
      disconnect()
      await removeLogin()
      toast.success({
        message: (
          <FormattedMessage
            defaultMessage="Wallet disconnected"
            description="src/components/Dialogs/RemoveWalletLoginDialog/Content.tsx"
          />
        ),
      })
      closeDialog()
    } catch (error) {
      setStep('failure')
      console.error(error)
    }
  }

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Disconnect wallet"
            description="src/components/Dialogs/RemoveWalletLoginDialog/Content.tsx"
          />
        }
      />

      <Dialog.Message>
        <p>
          {isConfirm && (
            <FormattedMessage
              defaultMessage="Are you sure you want to disconnect from this?"
              description="src/components/Dialogs/RemoveWalletLoginDialog/Content.tsx"
            />
          )}
          {isFailure && (
            <FormattedMessage
              defaultMessage="Unable to disconnect the wallet because you have not added or associated another login (Email/Wallet/Social account)."
              description="src/components/Dialogs/RemoveWalletLoginDialog/Content.tsx"
            />
          )}
        </p>
      </Dialog.Message>

      {isConfirm && (
        <Dialog.Footer
          btns={
            <>
              <Dialog.RoundedButton
                text={
                  <FormattedMessage
                    defaultMessage="Disconnect"
                    description="src/components/Dialogs/RemoveSocialLoginDialog/Content.tsx"
                  />
                }
                loading={loading}
                onClick={remove}
              />
              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Close" />}
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Cancel" />}
                color="greyDarker"
                onClick={closeDialog}
              />
              <Dialog.TextButton
                text={
                  <FormattedMessage
                    defaultMessage="Disconnect"
                    description="src/components/Dialogs/RemoveSocialLoginDialog/Content.tsx"
                  />
                }
                loading={loading}
                onClick={remove}
              />
            </>
          }
        />
      )}

      {isFailure && (
        <Dialog.Footer
          btns={
            <>
              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Close" />}
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Close" />}
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
        />
      )}
    </>
  )
}

export default RemoveWalletLoginDialogContent
