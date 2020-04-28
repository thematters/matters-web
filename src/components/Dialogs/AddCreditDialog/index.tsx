import { useContext, useState } from 'react'

import { Dialog, PaymentForm, ViewerContext } from '~/components'

import { numRound } from '~/common/utils'

import { AddCredit_addCredit_transaction } from '~/components/Forms/PaymentForm/AddCredit/__generated__/AddCredit'

type Step =
  | 'setPaymentPassword'
  | 'confirm'
  | 'checkout'
  | 'processing'
  | 'complete'

interface AddCreditDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseAddCreditDialog = ({ children }: AddCreditDialogProps) => {
  const viewer = useContext(ViewerContext)
  const [showDialog, setShowDialog] = useState(true)
  const initialStep = viewer.status?.hasPaymentPassword
    ? 'confirm'
    : 'setPaymentPassword'
  const [step, setStep] = useState<Step>(initialStep)
  const open = () => {
    setStep(initialStep)
    resetData()
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  const [data, setData] = useState<{
    transaction: AddCredit_addCredit_transaction | undefined
    client_secret: string
  }>({
    transaction: undefined,
    client_secret: '',
  })
  const resetData = () =>
    setData({
      transaction: undefined,
      client_secret: '',
    })

  const onConfirm = ({ transaction, client_secret }: any) => {
    setData({ ...data, transaction, client_secret })
    setStep('checkout')
  }

  const isSetPaymentPassword = step === 'setPaymentPassword'
  const isConfirm = step === 'confirm'
  const isCheckout = step === 'checkout'
  const isProcessing = step === 'processing'
  const isComplete = step === 'complete'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            isSetPaymentPassword
              ? 'paymentPassword'
              : isComplete
              ? 'successTopUp'
              : 'topUp'
          }
          close={close}
          closeTextId="close"
          leftButton={
            isCheckout ? (
              <Dialog.Header.BackButton onClick={() => setStep('confirm')} />
            ) : isProcessing ? (
              <span />
            ) : undefined
          }
        />

        {isSetPaymentPassword && (
          <PaymentForm.SetPassword submitCallback={() => setStep('confirm')} />
        )}
        {isConfirm && (
          <PaymentForm.AddCredit.Confirm submitCallback={onConfirm} />
        )}
        {isCheckout && data.transaction && (
          <PaymentForm.Checkout
            client_secret={data.client_secret}
            amount={numRound(data.transaction.amount + data.transaction.fee)}
            currency={data.transaction.currency}
            submitCallback={() => setStep('processing')}
          />
        )}
        {isProcessing && data.transaction && (
          <PaymentForm.Processing
            txId={data.transaction.id}
            nextStep={() => setStep('complete')}
          />
        )}
        {isComplete && data.transaction && (
          <PaymentForm.AddCredit.Complete
            amount={data.transaction.amount}
            currency={data.transaction.currency}
          />
        )}
      </Dialog>
    </>
  )
}

export const AddCreditDialog = (props: AddCreditDialogProps) => (
  <Dialog.Lazy mounted={<BaseAddCreditDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
