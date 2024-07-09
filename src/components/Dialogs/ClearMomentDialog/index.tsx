import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch } from '~/components'

export interface ClearMomentDialogProps {
  onConfirm: () => void
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseDialog = ({ onConfirm, children }: ClearMomentDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const onClick = async () => {
    onConfirm()

    closeDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="清空内容" id="HEiu24" />}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="確認清空當前編輯的内容嗎？"
                id="8Asqdm"
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Clear" id="/GCoTA" />}
              color={'green'}
              onClick={onClick}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Clear" id="/GCoTA" />}
              color={'green'}
              onClick={onClick}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const ClearMomentDialog = (props: ClearMomentDialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
