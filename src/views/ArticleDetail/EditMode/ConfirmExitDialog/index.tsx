import { FormattedMessage } from 'react-intl'

import { Dialog, Translate, useDialogSwitch } from '~/components'

interface ConfirmExitDialogProps {
  onExit: () => any
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const ConfirmExitDialog = ({ onExit, children }: ConfirmExitDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title={
            <Translate zh_hant="修訂須知" zh_hans="修订须知" en="Notice" />
          }
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="跳出該頁，本次操作不會保存"
              zh_hans="跳出该页，本次操作不会保存"
              en="If you leave before saving, your changes will be lost. "
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onExit()
              closeDialog()
            }}
          >
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <FormattedMessage defaultMessage="Cancel" description="Cancel button" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyConfirmExitDialog = (props: ConfirmExitDialogProps) => (
  <Dialog.Lazy mounted={<ConfirmExitDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyConfirmExitDialog
