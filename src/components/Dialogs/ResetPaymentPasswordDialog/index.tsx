import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

interface ResetPaymentPasswordProps {
  autoCloseDialog?: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicPaymentResetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ResetPassword'),
  { loading: () => <SpinnerBlock /> }
)

const BaseResetPaymentPasswordDialog: React.FC<ResetPaymentPasswordProps> = ({
  autoCloseDialog,
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicPaymentResetPasswordForm
          closeDialog={closeDialog}
          autoCloseDialog={autoCloseDialog}
        />
      </Dialog>
    </>
  )
}

export const ResetPaymentPasswordDialog = (
  props: ResetPaymentPasswordProps
) => (
  <Dialog.Lazy mounted={<BaseResetPaymentPasswordDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
