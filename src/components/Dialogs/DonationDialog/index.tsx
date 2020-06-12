import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dialog, PaymentForm, Translate, ViewerContext } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { numRound } from '~/common/utils'

import { AddCredit_addCredit_transaction as AddCreditTx } from '~/components/Forms/PaymentForm/AddCredit/__generated__/AddCredit'
import { PayTo_payTo_transaction as PayToTx } from '~/components/GQL/mutations/__generated__/PayTo'
import { UserDonationRecipient } from './__generated__/UserDonationRecipient'

type Step =
  | 'addCredit'
  | 'addCreditComplete'
  | 'addCreditProcessing'
  | 'checkout'
  | 'complete'
  | 'confirm'
  | 'passwordInvalid'
  | 'processing'
  | 'resetPasswordComplete'
  | 'resetPasswordConfirm'
  | 'resetPasswordRequest'
  | 'setAmount'
  | 'setPaymentPassword'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

interface SetAmountOpenTabCallbackValues {
  window: Window
  transaction: PayToTx
}

interface AddCreditData {
  client_secret: string
  transaction: AddCreditTx | undefined
}

interface ResetPasswordData {
  codeId: string
  email: string
}

interface DonationDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
  completeCallback?: () => void
  defaultStep?: Step
  recipient: UserDonationRecipient
  targetId: string
}

const fragments = {
  recipient: gql`
    fragment UserDonationRecipient on User {
      id
      avatar
      displayName
      liker {
        likerId
        civicLiker
      }
    }
  `,
}

const BaseDonationDialog = ({
  children,
  completeCallback,
  defaultStep = 'setAmount',
  recipient,
  targetId,
}: DonationDialogProps) => {
  const viewer = useContext(ViewerContext)

  const baseAddCreditData = { transaction: undefined, client_secret: '' }
  const baseResetPasswordData = { email: viewer.info.email, codeId: '' }

  const [showDialog, setShowDialog] = useState(true)
  const [step, setStep] = useState<Step>(defaultStep)
  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)

  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)
  const [payToTx, setPayToTx] = useState<Omit<PayToTx, '__typename'>>()
  const [addCreditData, setAddCreditData] = useState<AddCreditData>(
    baseAddCreditData
  )
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>(
    baseResetPasswordData
  )

  const open = () => {
    setAddCreditData(baseAddCreditData)
    setStep(defaultStep)
    setShowDialog(true)
  }

  const close = () => {
    setCurrency(CURRENCY.HKD)
    setShowDialog(false)
  }

  const setAmountCallback = (values: SetAmountCallbackValues) => {
    setAmount(values.amount)
    setCurrency(values.currency)
    if (values.currency === CURRENCY.HKD) {
      setStep(
        viewer.status?.hasPaymentPassword ? 'confirm' : 'setPaymentPassword'
      )
    }
  }

  const setAmountOpenTabCallback = (values: SetAmountOpenTabCallbackValues) => {
    setWindowRef(values.window)
    setPayToTx(values.transaction)
    setStep('processing')
  }

  const switchToLike = () => {
    setAmount(160)
    setCurrency(CURRENCY.LIKE)
    setStep('setAmount')
  }

  const switchToAddCredit = () => {
    setAddCreditData(baseAddCreditData)
    setStep('addCredit')
  }

  const addCreditCallback = ({ transaction, client_secret }: any) => {
    setAddCreditData({ ...addCreditData, transaction, client_secret })
    setStep('checkout')
  }

  const resetPasswordRequestCallback = ({ email, codeId }: any) => {
    setResetPasswordData({ ...resetPasswordData, email, codeId })
    setStep('resetPasswordConfirm')
  }

  const ContinueDonationButton = (
    <Dialog.Footer.Button
      type="button"
      bgColor="green"
      textColor="white"
      onClick={() => setStep('confirm')}
    >
      <Translate zh_hant="繼續支付" zh_hans="继续支付" />
    </Dialog.Footer.Button>
  )

  const isAddCredit = step === 'addCredit'
  const isAddCreditComplete = step === 'addCreditComplete'
  const isAddCreditProcessing = step === 'addCreditProcessing'
  const isCheckout = step === 'checkout'
  const isComplete = step === 'complete'
  const isConfirm = step === 'confirm'
  const isPasswordInvalid = step === 'passwordInvalid'
  const isProcessing = step === 'processing'
  const isResetPasswordComplete = step === 'resetPasswordComplete'
  const isResetPasswordConfirm = step === 'resetPasswordConfirm'
  const isResetPasswordRequest = step === 'resetPasswordRequest'
  const isSetAmount = step === 'setAmount'
  const isSetPaymentPassword = step === 'setPaymentPassword'
  const isHKD = currency === CURRENCY.HKD

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          close={close}
          closeTextId="close"
          title={
            isAddCredit || isCheckout || isAddCreditProcessing
              ? 'topUp'
              : isSetPaymentPassword
              ? 'paymentPassword'
              : isResetPasswordComplete ||
                isResetPasswordConfirm ||
                isResetPasswordRequest
              ? 'resetPaymentPassword'
              : 'donation'
          }
        />

        {isSetAmount && (
          <PaymentForm.PayTo.SetAmount
            close={close}
            defaultCurrency={currency}
            openTabCallback={setAmountOpenTabCallback}
            recipient={recipient}
            submitCallback={setAmountCallback}
            targetId={targetId}
          />
        )}

        {isConfirm && (
          <PaymentForm.PayTo.Confirm
            amount={amount}
            currency={currency}
            recipient={recipient}
            submitCallback={() => setStep(isHKD ? 'complete' : 'processing')}
            switchToAddCredit={switchToAddCredit}
            switchToLike={switchToLike}
            switchToPasswordInvalid={() => setStep('passwordInvalid')}
            targetId={targetId}
          />
        )}

        {isProcessing && (
          <PaymentForm.Processing
            nextStep={() => setStep('complete')}
            txId={payToTx?.id || ''}
            windowRef={windowRef}
          />
        )}

        {isComplete && (
          <PaymentForm.PayTo.Complete
            amount={amount}
            callback={completeCallback}
            currency={currency}
            recipient={recipient}
          />
        )}

        {isSetPaymentPassword && (
          <PaymentForm.SetPassword submitCallback={() => setStep('confirm')} />
        )}

        {/* below steps for add credit */}

        {isAddCredit && (
          <PaymentForm.AddCredit.Confirm submitCallback={addCreditCallback} />
        )}

        {isCheckout && addCreditData.transaction && (
          <PaymentForm.Checkout
            client_secret={addCreditData.client_secret}
            amount={numRound(
              addCreditData.transaction.amount + addCreditData.transaction.fee
            )}
            currency={addCreditData.transaction.currency}
            submitCallback={() => setStep('addCreditProcessing')}
          />
        )}

        {isAddCreditProcessing && addCreditData.transaction && (
          <PaymentForm.Processing
            txId={addCreditData.transaction.id}
            nextStep={() => setStep('addCreditComplete')}
          />
        )}

        {isAddCreditComplete && addCreditData.transaction && (
          <PaymentForm.AddCredit.Complete
            amount={addCreditData.transaction.amount}
            currency={addCreditData.transaction.currency}
            footerButtons={ContinueDonationButton}
          />
        )}

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
            footerButtons={ContinueDonationButton}
          />
        )}
      </Dialog>
    </>
  )
}

export const DonationDialog = (props: DonationDialogProps) => (
  <Dialog.Lazy mounted={<BaseDonationDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

DonationDialog.fragments = fragments
