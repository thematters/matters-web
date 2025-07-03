import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
import { ToggleRestrictUserMutation } from '~/gql/graphql'

const TOGGLE_RESTRICT_USER = gql`
  mutation ToggleRestrictUser(
    $id: ID!
    $restrictions: [UserRestrictionType!]!
  ) {
    putRestrictedUsers(input: { ids: [$id], restrictions: $restrictions }) {
      id
      oss {
        restrictions {
          type
        }
      }
    }
  }
`

export type OpenToggleRestrictUserDialogWithProps = {
  enabled: boolean
}

export interface ToggleRestrictUserDialogProps {
  id: string
  userName: string
  children: ({
    openDialog,
  }: {
    openDialog: (props: OpenToggleRestrictUserDialogWithProps) => void
  }) => React.ReactNode
}

const ToggleRestrictUserDialog = ({
  id,
  userName,
  children,
}: ToggleRestrictUserDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  const [enabled, setEnabled] = useState(false)
  const [toggleRestrictUser, { loading }] =
    useMutation<ToggleRestrictUserMutation>(TOGGLE_RESTRICT_USER)

  const openDialogWithProps = ({
    enabled,
  }: OpenToggleRestrictUserDialogWithProps) => {
    setEnabled(enabled)
    openDialog()
  }

  const onToggle = async () => {
    await toggleRestrictUser({
      variables: {
        id,
        restrictions: enabled ? [] : ['articleHottest', 'articleNewest'],
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
          title={<span>{enabled ? '放出小黑屋' : '關小黑屋'}</span>}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p
              dangerouslySetInnerHTML={{
                __html: enabled
                  ? `確認要将「<span class="u-highlight">${userName}</span>」從小黑屋中放出嗎？`
                  : `確認要将「<span class="u-highlight">${userName}</span>」關進小黑屋嗎？`,
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

export default ToggleRestrictUserDialog
