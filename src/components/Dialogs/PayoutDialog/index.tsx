import { useState } from 'react'

import { Dialog, PaymentForm } from '~/components'

type Step = 'connectStripeAccount' | 'confirm'

interface PayoutDialogProps {
  hasStripeAccount: boolean
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BasePayoutDialog = ({
  hasStripeAccount,
  children,
}: PayoutDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const initialStep = hasStripeAccount ? 'confirm' : 'connectStripeAccount'
  const [step, setStep] = useState<Step>(initialStep)
  const open = () => {
    setStep(initialStep)
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  const isConnectStripeAccount = step === 'connectStripeAccount'
  const isConfirm = step === 'confirm'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            isConnectStripeAccount ? 'connectStripeAccount' : 'paymentPayout'
          }
          close={close}
          closeTextId="close"
        />

        {isConnectStripeAccount && (
          <PaymentForm.ConnectStripeAccount
            nextStep={() => setStep('confirm')}
          />
        )}

        {isConfirm && <p>TODO</p>}
      </Dialog>
    </>
  )
}

export const PayoutDialog = (props: PayoutDialogProps) => (
  <Dialog.Lazy mounted={<BasePayoutDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
