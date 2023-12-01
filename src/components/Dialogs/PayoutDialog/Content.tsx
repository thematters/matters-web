import dynamic from 'next/dynamic'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Spinner, Translate } from '~/components'

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
  { loading: () => <Spinner /> }
)
const DynamicPayoutFormComplete = dynamic(
  () => import('~/components/Forms/PaymentForm/Payout/Complete'),
  { loading: () => <Spinner /> }
)
const DynamicPayoutFormConfirm = dynamic(
  () => import('~/components/Forms/PaymentForm/Payout/Confirm'),
  { loading: () => <Spinner /> }
)
const DynamicConnectStripeAccountForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ConnectStripeAccount'),
  { loading: () => <Spinner /> }
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
          callbackText={<Translate zh_hant="繼續提現" zh_hans="继续提现" />}
          closeDialog={closeDialog}
          back={back}
        />
      )}
    </>
  )
}

export default PayoutDialogContent
