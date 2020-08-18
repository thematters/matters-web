import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'

import {
  Dialog,
  PaymentForm,
  Translate,
  useStep,
  ViewerContext,
} from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { analytics, numRound } from '~/common/utils'

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
  const { currStep, prevStep, goForward, goBack } = useStep<Step>(defaultStep)
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
    goForward(defaultStep)
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
      goForward(
        viewer.status?.hasPaymentPassword ? 'confirm' : 'setPaymentPassword'
      )
    }
  }

  const setAmountOpenTabCallback = (values: SetAmountOpenTabCallbackValues) => {
    setWindowRef(values.window)
    setPayToTx(values.transaction)
    goForward('processing')
  }

  const switchToLike = () => {
    setAmount(160)
    setCurrency(CURRENCY.LIKE)
    goForward('setAmount')
  }

  const switchToAddCredit = () => {
    setAddCreditData(baseAddCreditData)
    goForward('addCredit')
  }

  const addCreditCallback = ({ transaction, client_secret }: any) => {
    setAddCreditData({ ...addCreditData, transaction, client_secret })
    goForward('checkout')
  }

  const resetPasswordRequestCallback = ({ email, codeId }: any) => {
    setResetPasswordData({ ...resetPasswordData, email, codeId })
    goForward('resetPasswordConfirm')
  }

  const ContinueDonationButton = (
    <Dialog.Footer.Button
      type="button"
      bgColor="green"
      textColor="white"
      onClick={() => goForward('confirm')}
    >
      <Translate zh_hant="繼續支付" zh_hans="继续支付" />
    </Dialog.Footer.Button>
  )

  /**
   * Add Credit
   */
  // add credit when credit not enough
  const isAddCredit = currStep === 'addCredit'
  const isAddCreditComplete = currStep === 'addCreditComplete'
  const isAddCreditProcessing = currStep === 'addCreditProcessing'
  // stripe elements
  const isCheckout = currStep === 'checkout'
  // processing
  const isProcessing = currStep === 'processing'

  /**
   * Donation
   */
  // complete dialog for donation
  const isComplete = currStep === 'complete'
  // set donation amount
  const isSetAmount = currStep === 'setAmount'
  // confirm donation amount
  const isConfirm = currStep === 'confirm'

  /**
   * Password
   */
  // wrong password
  const isPasswordInvalid = currStep === 'passwordInvalid'
  const isResetPasswordComplete = currStep === 'resetPasswordComplete'
  const isResetPasswordConfirm = currStep === 'resetPasswordConfirm'
  const isResetPasswordRequest = currStep === 'resetPasswordRequest'
  const isSetPaymentPassword = currStep === 'setPaymentPassword'

  const isHKD = currency === CURRENCY.HKD

  useEffect(() => {
    analytics.trackEvent('view_donation_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          close={close}
          leftButton={
            prevStep ? <Dialog.Header.BackButton onClick={goBack} /> : <span />
          }
          rightButton={
            <Dialog.Header.CloseButton close={close} textId="close" />
          }
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
            switchToAddCredit={switchToAddCredit}
            targetId={targetId}
          />
        )}

        {isConfirm && (
          <PaymentForm.PayTo.Confirm
            amount={amount}
            currency={currency}
            recipient={recipient}
            submitCallback={() => goForward(isHKD ? 'complete' : 'processing')}
            switchToAddCredit={switchToAddCredit}
            switchToLike={switchToLike}
            switchToPasswordInvalid={() => goForward('passwordInvalid')}
            targetId={targetId}
          />
        )}

        {isProcessing && (
          <PaymentForm.Processing
            nextStep={() => goForward('complete')}
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
          <PaymentForm.SetPassword
            submitCallback={() => goForward('confirm')}
          />
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
            submitCallback={() => goForward('addCreditProcessing')}
          />
        )}

        {isAddCreditProcessing && addCreditData.transaction && (
          <PaymentForm.Processing
            txId={addCreditData.transaction.id}
            nextStep={() => goForward('addCreditComplete')}
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
