import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  Form,
  Spacer,
  toast,
  useDialogSwitch,
  useMutation,
  useStep,
} from '~/components'
import { ArchiveUserMutation } from '~/gql/graphql'

const ARCHIVE_USER = gql`
  mutation ArchiveUser($id: ID!, $password: String!) {
    updateUserState(input: { id: $id, state: archived, password: $password }) {
      id
      status {
        state
      }
    }
  }
`

export interface ArchiveUserDialogProps {
  id: string
  userName: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

type Step = 'preConfirm' | 'confirm'

const ArchiveUserDialog = ({
  id,
  userName,
  children,
}: ArchiveUserDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(false)
  const { currStep, forward, reset } = useStep<Step>('preConfirm')
  const nextStep = () => forward('confirm')
  const isPreConfirm = currStep === 'preConfirm'

  const [password, setPasssword] = useState('')
  const [archiveUser, { loading }] =
    useMutation<ArchiveUserMutation>(ARCHIVE_USER)

  const openDialog = () => {
    reset('preConfirm')
    baseOpenDialog()
  }

  const onArchive = async () => {
    if (isPreConfirm) {
      nextStep()
    } else {
      await archiveUser({ variables: { id, password } })
      toast.info({ message: '用戶已註銷' })
      closeDialog()
    }
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title={<span>註銷用戶</span>} />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p
              dangerouslySetInnerHTML={{
                __html: isPreConfirm
                  ? `確認要将「<span class="u-highlight">${userName}</span>」註銷嗎？`
                  : `註銷操作將無法撤銷，確認要將「<span class="u-highlight">${userName}</span」註銷嗎？`,
              }}
            />
          </Dialog.Content.Message>

          {!isPreConfirm && (
            <>
              <Spacer size="sp8" />
              <Form.Input
                type="password"
                name="password"
                placeholder="請輸入密碼"
                onChange={(e) => {
                  setPasssword(e.target.value)
                }}
              />
            </>
          )}
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                isPreConfirm ? (
                  <FormattedMessage defaultMessage="Confirm" id="N2IrpM" />
                ) : (
                  <span>確認註銷</span>
                )
              }
              color="red"
              onClick={onArchive}
              loading={loading}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                isPreConfirm ? (
                  <FormattedMessage defaultMessage="Confirm" id="N2IrpM" />
                ) : (
                  <span>確認註銷</span>
                )
              }
              color="red"
              onClick={onArchive}
              loading={loading}
            />
          }
        />
      </Dialog>
    </>
  )
}

export default ArchiveUserDialog
