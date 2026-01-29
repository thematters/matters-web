import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
import { ToggleFreezeUserMutation } from '~/gql/graphql'

const TOGGLE_FREEZE_USER = gql`
  mutation ToggleFreezeUser($id: ID!, $state: UserState!) {
    updateUserState(input: { id: $id, state: $state }) {
      id
      status {
        state
      }
    }
  }
`

export type OpenToggleFreezeUserDialogWithProps = {
  isFrozen: boolean
}

export interface ToggleFreezeUserDialogProps {
  id: string
  userName: string
  children: ({
    openDialog,
  }: {
    openDialog: (props: OpenToggleFreezeUserDialogWithProps) => void
  }) => React.ReactNode
}

const ToggleFreezeUserDialog = ({
  id,
  userName,
  children,
}: ToggleFreezeUserDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  const [isFrozen, setIsFrozen] = useState(false)
  const [toggleFreezeUser, { loading }] =
    useMutation<ToggleFreezeUserMutation>(TOGGLE_FREEZE_USER)

  const openDialogWithProps = ({
    isFrozen,
  }: OpenToggleFreezeUserDialogWithProps) => {
    setIsFrozen(isFrozen)
    openDialog()
  }

  const onToggle = async () => {
    await toggleFreezeUser({
      variables: {
        id,
        state: isFrozen ? 'active' : 'frozen',
      },
    })
    toast.info({ message: '設置成功' })
    closeDialog()
  }

  return (
    <>
      {children({ openDialog: openDialogWithProps })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<span>{isFrozen ? '解除凍結' : '凍結用戶'}</span>}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p
              dangerouslySetInnerHTML={{
                __html: isFrozen
                  ? `確認要将「<span class="u-highlight">${userName}</span>」解除凍結嗎？`
                  : `確認要将「<span class="u-highlight">${userName}</span>」凍結嗎？`,
              }}
            />
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              color="green"
              onClick={onToggle}
              loading={loading}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
              color="green"
              onClick={onToggle}
              loading={loading}
            />
          }
        />
      </Dialog>
    </>
  )
}

export default ToggleFreezeUserDialog
