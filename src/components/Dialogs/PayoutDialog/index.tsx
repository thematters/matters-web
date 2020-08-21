import { useState } from 'react'

import { Dialog, PaymentForm, Translate, useStep } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

type Step =
  | 'complete'
  | 'connectStripeAccount'
  | 'confirm'
  | 'processing'
  | 'resetPassword'

interface PayoutDialogProps {
  hasStripeAccount: boolean
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BasePayoutDialog = ({
  hasStripeAccount,
  children,
}: PayoutDialogProps) => {
  const initialStep = hasStripeAccount ? 'confirm' : 'connectStripeAccount'

  const [showDialog, setShowDialog] = useState(true)
  const { currStep, forward, prevStep, back } = useStep<Step>(initialStep)

  const open = () => {
    forward(initialStep)
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  const ContinuePayoutButton = (
    <Dialog.Footer.Button type="button" onClick={() => forward('confirm')}>
      <Translate zh_hant="繼續提現" zh_hans="继续提现" />
    </Dialog.Footer.Button>
  )

  const isComplete = currStep === 'complete'
  const isConnectStripeAccount = currStep === 'connectStripeAccount'
  const isConfirm = currStep === 'confirm'
  const isResetPassword = currStep === 'resetPassword'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          leftButton={
            prevStep ? <Dialog.Header.BackButton onClick={back} /> : <span />
          }
          rightButton={
            <Dialog.Header.CloseButton close={close} textId="close" />
          }
          title={
            isConnectStripeAccount
              ? 'connectStripeAccount'
              : isResetPassword
              ? 'resetPaymentPassword'
              : isComplete
              ? 'paymentPayoutComplete'
              : 'paymentPayout'
          }
          close={close}
          closeTextId="close"
        />

        {isConnectStripeAccount && (
          <PaymentForm.ConnectStripeAccount
            nextStep={() => forward('confirm')}
          />
        )}

        {isConfirm && (
          <PaymentForm.Payout.Confirm
            currency={CURRENCY.HKD}
            submitCallback={() => forward('complete')}
            switchToResetPassword={() => forward('resetPassword')}
          />
        )}

        {isComplete && <PaymentForm.Payout.Complete close={close} />}

        {isResetPassword && (
          <PaymentForm.ResetPassword
            callbackButtons={ContinuePayoutButton}
            close={close}
          />
        )}
      </Dialog>
    </>
  )
}

export const PayoutDialog = (props: PayoutDialogProps) => (
  <Dialog.Lazy mounted={<BasePayoutDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
