import { useState } from 'react'

import { Dialog, PaymentForm } from '~/components'

type Step = 'confirm' | 'charge' | 'complete'

interface AddCreditDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseAddCreditDialog = ({ children }: AddCreditDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const [step, setStep] = useState<Step>('confirm')
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)
  // const nextStep = () => setStep('charge')

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header title="topUp" close={close} />

        {step === 'confirm' && <PaymentForm.AddCredit.Confirm />}
        {step === 'charge' && <PaymentForm.Charge />}
        {step === 'complete' && <PaymentForm.AddCredit.Complete />}
      </Dialog>
    </>
  )
}

export const AddCreditDialog = (props: AddCreditDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <BaseAddCreditDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)
