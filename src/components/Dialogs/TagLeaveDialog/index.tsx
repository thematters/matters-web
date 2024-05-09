import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import { UpdateTagSettingMutation } from '~/gql/graphql'

export interface TagLeaveDialogProps {
  id: string
  isOwner?: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseDialog = ({ id, isOwner, children }: TagLeaveDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [update, { loading }] =
    useMutation<UpdateTagSettingMutation>(UPDATE_TAG_SETTING)

  const onClick = async () => {
    const result = await update({
      variables: {
        input: { id, type: isOwner ? 'leave' : 'leave_editor' },
      },
    })

    if (!result) {
      throw new Error('tag leave failed')
    }

    toast.success({
      message: (
        <FormattedMessage defaultMessage="Resignation Success" id="lMKb5N" />
      ),
    })

    closeDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Resign as tag maintainer"
              id="Qzdtxi"
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <h3>
              <FormattedMessage defaultMessage="Are you sure 😭" id="yXWwSW" />
            </h3>
            <p>
              <FormattedMessage
                defaultMessage="After resignation, you will not be able to manage tags."
                id="kCp8A9"
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                <FormattedMessage
                  defaultMessage="Confirm Resignation"
                  id="lT6Dt8"
                />
              }
              color={loading ? 'green' : 'red'}
              onClick={onClick}
              loading={loading}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Confirm Resignation"
                  id="lT6Dt8"
                />
              }
              color={loading ? 'green' : 'red'}
              onClick={onClick}
              loading={loading}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const TagLeaveDialog = (props: TagLeaveDialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
