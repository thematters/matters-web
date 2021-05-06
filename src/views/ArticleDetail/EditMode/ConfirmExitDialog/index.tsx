import { Dialog, Translate, useDialogSwitch } from '~/components'

interface ConfirmExitDialogProps {
  onExit: () => any
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const ConfirmExitDialog = ({ onExit, children }: ConfirmExitDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <Dialog.Header
          title={<Translate zh_hant="修訂須知" zh_hans="修订须知" />}
          close={close}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="跳出該頁，本次操作不會保存"
              zh_hans="跳出该页，本次操作不会保存"
              en="You will lost your changes if you leave this page"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onExit()
              close()
            }}
          >
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyConfirmExitDialog = (props: ConfirmExitDialogProps) => (
  <Dialog.Lazy mounted={<ConfirmExitDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyConfirmExitDialog
