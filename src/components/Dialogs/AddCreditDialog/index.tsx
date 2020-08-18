import { useContext, useEffect, useState } from 'react'

import { Dialog, PaymentForm, useStep, ViewerContext } from '~/components'

import { analytics, numRound } from '~/common/utils'

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
  const { currStep, goForward } = useStep<Step>(initialStep)
  const open = () => {
    goForward(initialStep)
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
    goForward('checkout')
    analytics.trackEvent('click_button', { type: 'checkout' })
  }

  // set password if needed
  const isSetPaymentPassword = currStep === 'setPaymentPassword'

  // confirm add credit amount
  const isConfirm = currStep === 'confirm'

  // stripe elements for credit card info
  const isCheckout = currStep === 'checkout'

  // loader and error catching
  const isProcessing = currStep === 'processing'

  // confirmation
  const isComplete = currStep === 'complete'

  useEffect(() => {
    analytics.trackEvent('view_add_credit_dialog', { step: currStep })
  }, [currStep])

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
              <Dialog.Header.BackButton onClick={() => goForward('confirm')} />
            ) : isProcessing ? (
              <span />
            ) : undefined
          }
        />

        {isSetPaymentPassword && (
          <PaymentForm.SetPassword
            submitCallback={() => goForward('confirm')}
          />
        )}
        {isConfirm && (
          <PaymentForm.AddCredit.Confirm submitCallback={onConfirm} />
        )}
        {isCheckout && data.transaction && (
          <PaymentForm.Checkout
            client_secret={data.client_secret}
            amount={numRound(data.transaction.amount + data.transaction.fee)}
            currency={data.transaction.currency}
            submitCallback={() => goForward('processing')}
          />
        )}
        {isProcessing && data.transaction && (
          <PaymentForm.Processing
            txId={data.transaction.id}
            nextStep={() => goForward('complete')}
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
