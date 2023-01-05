import dynamic from 'next/dynamic'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import {
  Dialog,
  Spinner,
  Translate,
  useDialogSwitch,
  useStep,
} from '~/components'

type Step =
  | 'complete'
  | 'connectStripeAccount'
  | 'confirm'
  | 'processing'
  | 'resetPassword'

interface PayoutDialogProps {
  hasStripeAccount: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
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

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const { currStep, forward, prevStep, back } = useStep<Step>(initialStep)

  const openDialog = () => {
    forward(initialStep)
    baseOpenDialog()
  }

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
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          leftButton={
            prevStep ? <Dialog.Header.BackButton onClick={back} /> : <span />
          }
          rightButton={
            <Dialog.Header.CloseButton
              closeDialog={closeDialog}
              textId="close"
            />
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
            callbackButtons={ContinuePayoutButton}
            closeDialog={closeDialog}
          />
        )}
      </Dialog>
    </>
  )
}

export const PayoutDialog = (props: PayoutDialogProps) => (
  <Dialog.Lazy mounted={<BasePayoutDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
