import { useState } from 'react'

import { Dialog, PaymentForm } from '~/components'

interface ResetPaymentPasswordProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseResetPaymentPasswordDialog: React.FC<ResetPaymentPasswordProps> = ({
  children,
}) => {
  const [showDialog, setShowDialog] = useState(true)

  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="resetPaymentPassword"
          close={close}
          closeTextId="close"
        />

        <PaymentForm.ResetPassword close={close} />
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
