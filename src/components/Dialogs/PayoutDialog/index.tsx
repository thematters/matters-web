import { useContext, useState } from 'react'

import { Dialog, PaymentForm, Translate, ViewerContext } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import { Payout_payout as PayoutResult } from '~/components/GQL/mutations/__generated__/Payout'

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
  const [step, setStep] = useState<Step>(initialStep)

  const [payoutTx, setPayoutTx] = useState<PayoutResult>()
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>(
    { email: viewer.info.email, codeId: '' }
  )

  const open = () => {
    setStep(initialStep)
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  const resetPasswordRequestCallback = ({ email, codeId }: any) => {
    setResetPasswordData({ ...resetPasswordData, email, codeId })
    setStep('resetPasswordConfirm')
  }

  const ContinuePayoutButton = (
    <Dialog.Footer.Button
      type="button"
      bgColor="green"
      textColor="white"
      onClick={() => setStep('confirm')}
    >
      <Translate zh_hant="繼續提現" zh_hans="继续提现" />
    </Dialog.Footer.Button>
  )

  const isComplete = step === 'complete'
  const isConnectStripeAccount = step === 'connectStripeAccount'
  const isConfirm = step === 'confirm'
  const isPasswordInvalid = step === 'passwordInvalid'
  const isProcessing = step === 'processing'
  const isResetPasswordComplete = step === 'resetPasswordComplete'
  const isResetPasswordConfirm = step === 'resetPasswordConfirm'
  const isResetPasswordRequest = step === 'resetPasswordRequest'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            isConnectStripeAccount
              ? 'connectStripeAccount'
              : isComplete
              ? 'paymentPayoutComplete'
              : 'paymentPayout'
          }
          close={close}
          closeTextId="close"
        />

        {isConnectStripeAccount && (
          <PaymentForm.ConnectStripeAccount
            nextStep={() => setStep('confirm')}
          />
        )}

        {isConfirm && (
          <PaymentForm.Payout.Confirm
            currency={CURRENCY.HKD}
            submitCallback={(tx) => {
              setPayoutTx(tx)
              setStep('processing')
            }}
            switchToPasswordInvalid={() => setStep('passwordInvalid')}
          />
        )}

        {isProcessing && (
          <PaymentForm.Processing
            nextStep={() => setStep('complete')}
            txId={payoutTx?.id || ''}
          />
        )}

        {isComplete && <PaymentForm.Payout.Complete />}

        {/* below steps for password management */}

        {isPasswordInvalid && (
          <PaymentForm.PasswordInvalid
            switchToPrevious={() => setStep('confirm')}
            switchToResetPassword={() => setStep('resetPasswordRequest')}
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
            submitCallback={() => setStep('resetPasswordComplete')}
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
