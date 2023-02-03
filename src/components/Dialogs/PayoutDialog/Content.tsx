import dynamic from 'next/dynamic'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Dialog, Spinner, Translate } from '~/components'

import { Step } from './types'

interface PayoutDialogContentProps {
  closeDialog: () => void
  forward: (step: Step) => void
  back: () => void
  currStep: Step
  prevStep: Step
  hasStripeAccount: boolean
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

const ContinuePayoutButton = ({
  forward,
}: {
  forward: (step: Step) => void
}) => (
  <Dialog.Footer.Button type="button" onClick={() => forward('confirm')}>
    <Translate zh_hant="繼續提現" zh_hans="继续提现" />
  </Dialog.Footer.Button>
)

const PayoutDialogContent = ({
  hasStripeAccount,
  forward,
  back,
  currStep,
  prevStep,
  closeDialog,
}: PayoutDialogContentProps) => {
  const isComplete = currStep === 'complete'
  const isConnectStripeAccount = currStep === 'connectStripeAccount'
  const isConfirm = currStep === 'confirm'
  const isResetPassword = currStep === 'resetPassword'

  return (
    <>
      <Dialog.Header
        leftButton={
          prevStep ? <Dialog.Header.BackButton onClick={back} /> : <span />
        }
        rightButton={
          <Dialog.Header.CloseButton closeDialog={closeDialog} textId="close" />
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
        closeDialog={closeDialog}
        closeTextId="close"
      />

      {isConnectStripeAccount && (
        <DynamicConnectStripeAccountForm
          nextStep={() => forward('confirm')}
          closeDialog={closeDialog}
        />
      )}

      {isConfirm && (
        <DynamicPayoutFormConfirm
          currency={CURRENCY.HKD}
          submitCallback={() => forward('complete')}
          switchToResetPassword={() => forward('resetPassword')}
        />
      )}

      {isComplete && <DynamicPayoutFormComplete closeDialog={closeDialog} />}

      {isResetPassword && (
        <DynamicPaymentResetPasswordForm
          callbackButtons={<ContinuePayoutButton forward={forward} />}
          closeDialog={closeDialog}
        />
      )}
    </>
  )
}

export default PayoutDialogContent
