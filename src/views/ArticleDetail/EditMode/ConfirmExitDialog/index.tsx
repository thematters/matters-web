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

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate zh_hant="修訂須知" zh_hans="修订须知" en="Notice" />
          }
          closeDialog={closeDialog}
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

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<Translate id="confirm" />}
              color="green"
              onClick={() => {
                onExit()
                closeDialog()
              }}
            />
          }
          mdUpBtns={
            <Dialog.TextButton
              text={<Translate id="confirm" />}
              color="green"
              onClick={() => {
                onExit()
                closeDialog()
              }}
            />
          }
        />
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
