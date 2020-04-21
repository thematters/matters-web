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
  const close = () => {
    setShowDialog(false)
    resetData()
  }

  const [data, setData] = useState<{ transaction: any; client_secret: string }>(
    {
      transaction: null,
      client_secret: '',
    }
  )
  const resetData = () =>
    setData({
      transaction: null,
      client_secret: '',
    })

  const onConfirm = ({ transaction, client_secret }: any) => {
    setData({ ...data, transaction, client_secret })
    setStep('charge')
  }

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        {step === 'confirm' && (
          <PaymentForm.AddCredit.Confirm
            closeDialog={close}
            submitCallback={onConfirm}
          />
        )}
        {step === 'charge' && <PaymentForm.Charge closeDialog={close} />}
        {step === 'complete' && (
          <PaymentForm.AddCredit.Complete closeDialog={close} />
        )}
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
