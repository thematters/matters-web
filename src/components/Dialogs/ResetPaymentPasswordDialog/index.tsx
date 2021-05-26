import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

interface ResetPaymentPasswordProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicPaymentResetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ResetPassword'),
  { loading: Spinner }
)

const BaseResetPaymentPasswordDialog: React.FC<ResetPaymentPasswordProps> = ({
  children,
}) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="resetPaymentPassword"
          close={close}
          closeTextId="close"
        />

        <DynamicPaymentResetPasswordForm close={close} />
      </Dialog>
    </>
  )
}

export const ResetPaymentPasswordDialog = (
  props: ResetPaymentPasswordProps
) => (
  <Dialog.Lazy mounted={<BaseResetPaymentPasswordDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
