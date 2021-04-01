import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, Spinner, Translate, useStep } from '~/components'

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

const DynamicPaymentResetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ResetPassword'),
  { loading: Spinner }
)
const DynamicPayoutFormComplete = dynamic(
  () => import('~/components/Forms/PaymentForm/Payout/Complete'),
  { loading: Spinner }
)
const DynamicPayoutFormConfirm = dynamic(
  () => import('~/components/Forms/PaymentForm/Payout/Confirm'),
  { loading: Spinner }
)
const DynamicConnectStripeAccountForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ConnectStripeAccount'),
  { loading: Spinner }
)

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
          <DynamicConnectStripeAccountForm
            nextStep={() => forward('confirm')}
          />
        )}

        {isConfirm && (
          <DynamicPayoutFormConfirm
            currency={CURRENCY.HKD}
            submitCallback={() => forward('complete')}
            switchToResetPassword={() => forward('resetPassword')}
          />
        )}

        {isComplete && <DynamicPayoutFormComplete close={close} />}

        {isResetPassword && (
          <DynamicPaymentResetPasswordForm
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
