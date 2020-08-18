import { useContext, useState } from 'react'

import {
  Dialog,
  PaymentForm,
  Translate,
  useStep,
  ViewerContext,
} from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

type Step =
  | 'complete'
  | 'connectStripeAccount'
  | 'confirm'
  | 'passwordInvalid'
  | 'processing'
  | 'resetPasswordComplete'
  | 'resetPasswordConfirm'
  | 'resetPasswordRequest'

interface PayoutDialogProps {
  hasStripeAccount: boolean
  children: ({ open }: { open: () => void }) => React.ReactNode
}

interface ResetPasswordData {
  codeId: string
  email: string
}

const BasePayoutDialog = ({
  hasStripeAccount,
  children,
}: PayoutDialogProps) => {
  const initialStep = hasStripeAccount ? 'confirm' : 'connectStripeAccount'

  const viewer = useContext(ViewerContext)
  const [showDialog, setShowDialog] = useState(true)
  const { currStep, goForward } = useStep<Step>(initialStep)

  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>(
    { email: viewer.info.email, codeId: '' }
  )

  const open = () => {
    goForward(initialStep)
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  const resetPasswordRequestCallback = ({ email, codeId }: any) => {
    setResetPasswordData({ ...resetPasswordData, email, codeId })
    goForward('resetPasswordConfirm')
  }

  const ContinuePayoutButton = (
    <Dialog.Footer.Button
      type="button"
      bgColor="green"
      textColor="white"
      onClick={() => goForward('confirm')}
    >
      <Translate zh_hant="繼續提現" zh_hans="继续提现" />
    </Dialog.Footer.Button>
  )

  const isComplete = currStep === 'complete'
  const isConnectStripeAccount = currStep === 'connectStripeAccount'
  const isConfirm = currStep === 'confirm'
  const isPasswordInvalid = currStep === 'passwordInvalid'
  const isResetPasswordComplete = currStep === 'resetPasswordComplete'
  const isResetPasswordConfirm = currStep === 'resetPasswordConfirm'
  const isResetPasswordRequest = currStep === 'resetPasswordRequest'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            isConnectStripeAccount
              ? 'connectStripeAccount'
              : isResetPasswordComplete ||
                isResetPasswordConfirm ||
                isResetPasswordRequest
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
            nextStep={() => goForward('confirm')}
          />
        )}

        {isConfirm && (
          <PaymentForm.Payout.Confirm
            currency={CURRENCY.HKD}
            submitCallback={(tx) => goForward('complete')}
            switchToPasswordInvalid={() => goForward('passwordInvalid')}
          />
        )}

        {isComplete && <PaymentForm.Payout.Complete />}

        {/* below steps for password management */}

        {isPasswordInvalid && (
          <PaymentForm.PasswordInvalid
            switchToPrevious={() => goForward('confirm')}
            switchToResetPassword={() => goForward('resetPasswordRequest')}
          />
        )}

        {isResetPasswordRequest && (
          <PaymentForm.ResetPassword.Request
            defaultEmail={resetPasswordData.email}
            submitCallback={resetPasswordRequestCallback}
          />
        )}

        {isResetPasswordConfirm && (
          <PaymentForm.ResetPassword.Confirm
            codeId={resetPasswordData.codeId}
            submitCallback={() => goForward('resetPasswordComplete')}
          />
        )}

        {isResetPasswordComplete && (
          <PaymentForm.ResetPassword.Complete
            closeDialog={close}
            footerButtons={ContinuePayoutButton}
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
