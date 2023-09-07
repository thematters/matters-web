import _pickBy from 'lodash/pickBy'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useMutation } from '~/components'
import { RemoveSocialLoginMutation, SocialAccountType } from '~/gql/graphql'

import { ROOT_QUERY_PRIVATE } from '../../Root/gql'
import { REMOVE_SOCIAL_LOGIN } from './gql'

interface Props {
  closeDialog: () => void
  type: SocialAccountType
}

type Step = 'confirm' | 'failure'

const RemoveSocailLoginDialogContent: React.FC<Props> = ({
  closeDialog,
  type,
}) => {
  const [removeLogin, { loading }] = useMutation<RemoveSocialLoginMutation>(
    REMOVE_SOCIAL_LOGIN,
    undefined,
    {
      showToast: false,
    }
  )

  const [step, setStep] = useState<Step>('confirm')
  const isConfirm = step === 'confirm'
  const isFailure = step === 'failure'

  const remove = async () => {
    try {
      await removeLogin({
        variables: {
          input: {
            type,
          },
        },
        refetchQueries: [
          {
            query: ROOT_QUERY_PRIVATE,
          },
        ],
      })
      toast.success({
        message: (
          <FormattedMessage
            defaultMessage="{type} disconnected"
            description="src/components/Dialogs/RemoveSocialLoginDialog/Content.tsx"
            values={{
              type,
            }}
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
            defaultMessage="Disconnect from {type}"
            description="src/components/Dialogs/RemoveSocialLoginDialog/Content.tsx"
            values={{
              type,
            }}
          />
        }
      />

      <Dialog.Message>
        <p>
          {isConfirm && (
            <FormattedMessage
              defaultMessage="Do you want to disconnect from {type}?"
              description="src/components/Dialogs/RemoveSocialLoginDialog/Content.tsx"
              values={{
                type,
              }}
            />
          )}
          {isFailure && (
            <FormattedMessage
              defaultMessage="Unable to disconnect from {type} temporarily because you do not have any other log in methods (Email/Crypto wallet/Social account)."
              description="src/components/Dialogs/RemoveSocialLoginDialog/Content.tsx"
              values={{
                type,
              }}
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

export default RemoveSocailLoginDialogContent
