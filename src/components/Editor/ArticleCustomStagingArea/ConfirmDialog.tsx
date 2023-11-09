import { FormattedMessage } from 'react-intl'

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

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate
              en="Are you sure to delete?"
              zh_hans="确认删除"
              zh_hant="確認刪除"
            />
          }
        />

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
              color="red"
              onClick={removeArticle}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Delete" id="K3r6DQ" />}
              color="red"
              onClick={removeArticle}
            />
          }
        />
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
