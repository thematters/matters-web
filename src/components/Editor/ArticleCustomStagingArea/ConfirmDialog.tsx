import { Dialog, Translate, useDialogSwitch } from '~/components'

interface ConfirmDialogProps {
  removeArticle: () => void
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const ConfirmDialog = ({ removeArticle, children }: ConfirmDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title={
            <Translate
              en="Are you sure to delete?"
              zh_hans="确认删除"
              zh_hant="確認刪除"
            />
          }
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              removeArticle()
            }}
          >
            <Translate id="delete" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyConfirmDialog = (props: ConfirmDialogProps) => (
  <Dialog.Lazy mounted={<ConfirmDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyConfirmDialog
