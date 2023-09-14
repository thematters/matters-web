import _pickBy from 'lodash/pickBy'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Dialog, toast, useMutation, useRoute } from '~/components'
import { SetUserNameMutation } from '~/gql/graphql'

import { SET_USER_NAME } from './gql'

interface Props {
  userName: string
  back: () => void
  closeDialog: () => void
}

const ConfirmStep: React.FC<Props> = ({ userName, back, closeDialog }) => {
  const { router } = useRoute()

  const [update, { loading }] = useMutation<SetUserNameMutation>(
    SET_USER_NAME,
    undefined,
    {
      showToast: true,
    }
  )

  const confirmUse = async () => {
    try {
      await update({ variables: { userName } })

      toast.success({
        duration: Infinity,
        message: (
          <FormattedMessage
            defaultMessage="Matters ID has been set up. More account info can be found in Settings"
            description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
          />
        ),
        actions: [
          {
            content: (
              <FormattedMessage
                defaultMessage="Take a look"
                description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
              />
            ),
            onClick: () => {
              router.push(PATHS.ME_SETTINGS)
            },
          },
        ],
      })
      closeDialog()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Confirm Matters ID"
            description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
          />
        }
      />

      <Dialog.Message>
        <p>
          <FormattedMessage
            defaultMessage="This ID cannot be modified. Are you sure you want to use {id} as your Matters ID?"
            description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
            values={{
              id: <span className="u-highlight">{userName}</span>,
            }}
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer
        btns={
          <>
            <Dialog.RoundedButton
              disabled={loading}
              text={
                <FormattedMessage
                  defaultMessage="Confirm use"
                  description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
                />
              }
              loading={loading}
              onClick={confirmUse}
            />
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Back" />}
              color="greyDarker"
              onClick={back}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" />}
              color="greyDarker"
              onClick={back}
            />
            <Dialog.TextButton
              disabled={loading}
              text={
                <FormattedMessage
                  defaultMessage="Confirm use"
                  description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
                />
              }
              loading={loading}
              onClick={confirmUse}
            />
          </>
        }
      />
    </>
  )
}

export default ConfirmStep
