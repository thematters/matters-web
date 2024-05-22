import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

interface SetPaymentPasswordDialogProps {
  submitCallback: () => void
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseSetPaymentPasswordDialog = ({
  children,
  submitCallback,
}: SetPaymentPasswordDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          closeDialog={closeDialog}
          submitCallback={submitCallback}
        />
      </Dialog>
    </>
  )
}

export const SetPaymentPasswordDialog = (
  props: SetPaymentPasswordDialogProps
) => (
  <Dialog.Lazy mounted={<BaseSetPaymentPasswordDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
