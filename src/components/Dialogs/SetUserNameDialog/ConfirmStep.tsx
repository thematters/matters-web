import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import {
  Dialog,
  toast,
  useMutation,
  useRoute,
  ViewerContext,
} from '~/components'
import { SetUserNameMutation } from '~/gql/graphql'

import { SET_USER_NAME } from './gql'

interface Props {
  userName: string
  back: () => void
  closeDialog: () => void
}

const ConfirmStep: React.FC<Props> = ({ userName, back, closeDialog }) => {
  const { router } = useRoute()
  const viewer = useContext(ViewerContext)

  const [update, { loading }] = useMutation<SetUserNameMutation>(
    SET_USER_NAME,
    {
      update: (cache) => {
        cache.evict({ id: cache.identify(viewer), fieldName: 'userName' })
        cache.gc()
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
      },
    },
    { showToast: true }
  )

  const confirmUse = async () => {
    try {
      await update({ variables: { userName } })

      toast.info({
        duration: Infinity,
        message: (
          <FormattedMessage
            defaultMessage="Matters ID has been set up. More account info can be found in Settings"
            id="0CyECR"
            description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
          />
        ),
        actions: [
          {
            content: (
              <FormattedMessage
                defaultMessage="Take a look"
                id="1QrwIl"
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
            id="202PEj"
            description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
          />
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="This ID cannot be modified. Are you sure you want to use {id} as your Matters ID?"
              id="FxrSCh"
              description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
              values={{
                id: <span className="u-highlight">{userName}</span>,
              }}
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            <Dialog.RoundedButton
              disabled={loading}
              text={
                <FormattedMessage
                  defaultMessage="Confirm use"
                  id="IPqNCS"
                  description="src/components/Dialogs/SetUserNameDialog/ConfirmStep.tsx"
                />
              }
              loading={loading}
              onClick={confirmUse}
            />
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              color="greyDarker"
              onClick={back}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              color="greyDarker"
              onClick={back}
            />
            <Dialog.TextButton
              disabled={loading}
              text={
                <FormattedMessage
                  defaultMessage="Confirm use"
                  id="IPqNCS"
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
