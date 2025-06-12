import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { SpinnerBlock } from '~/components'

import { Step } from './types'

interface PayoutDialogContentProps {
  closeDialog: () => void
  forward: (step: Step) => void
  back: () => void
  currStep: Step
  prevStep: Step
}

const DynamicPaymentResetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ResetPassword'),
  { loading: () => <SpinnerBlock /> }
)
const DynamicPayoutFormComplete = dynamic(
  () => import('~/components/Forms/PaymentForm/Payout/Complete'),
  { loading: () => <SpinnerBlock /> }
)
const DynamicPayoutFormConfirm = dynamic(
  () => import('~/components/Forms/PaymentForm/Payout/Confirm'),
  { loading: () => <SpinnerBlock /> }
)
const DynamicConnectStripeAccountForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ConnectStripeAccount'),
  { loading: () => <SpinnerBlock /> }
)

const PayoutDialogContent = ({
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
      {isConnectStripeAccount && (
        <DynamicConnectStripeAccountForm
          back={prevStep ? back : undefined}
          nextStep={() => forward('confirm')}
          closeDialog={closeDialog}
        />
      )}

      {isConfirm && (
        <DynamicPayoutFormConfirm
          back={prevStep ? back : undefined}
          currency={CURRENCY.HKD}
          submitCallback={() => forward('complete')}
          switchToResetPassword={() => forward('resetPassword')}
          closeDialog={closeDialog}
        />
      )}

      {isComplete && <DynamicPayoutFormComplete closeDialog={closeDialog} />}

      {isResetPassword && (
        <DynamicPaymentResetPasswordForm
          callback={() => forward('confirm')}
          callbackText={
            <FormattedMessage defaultMessage="Continue payout" id="WsPbZT" />
          }
          closeDialog={closeDialog}
          back={back}
        />
      )}
    </>
  )
}

export default PayoutDialogContent
