import _pickBy from 'lodash/pickBy'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { DialogBeta, toast, useMutation, useRoute } from '~/components'
import { SetUserNameMutation } from '~/gql/graphql'
import { USER_PROFILE_PUBLIC } from '~/views/User/UserProfile/gql'

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
      await update({
        variables: { userName },
        refetchQueries: [
          {
            query: USER_PROFILE_PUBLIC,
            variables: { userName },
          },
        ],
      })

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
      <DialogBeta.Header
        title={
          <FormattedMessage
            defaultMessage="Confirm Matters ID"
            description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
          />
        }
      />
      <DialogBeta.Content>
        <DialogBeta.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="This ID cannot be modified. Are you sure you want to use {id} as your Matters ID?"
              description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
              values={{
                id: <span className="u-highlight">{userName}</span>,
              }}
            />
          </p>
        </DialogBeta.Content.Message>
      </DialogBeta.Content>

      <DialogBeta.Footer
        btns={
          <>
            <DialogBeta.RoundedButton
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
            <DialogBeta.RoundedButton
              text={<FormattedMessage defaultMessage="Back" />}
              color="greyDarker"
              onClick={back}
            />
          </>
        }
        smUpBtns={
          <>
            <DialogBeta.TextButton
              text={<FormattedMessage defaultMessage="Back" />}
              color="greyDarker"
              onClick={back}
            />
            <DialogBeta.TextButton
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
