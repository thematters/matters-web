// TODO: Will delete this file after the new article support is ready

import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Spinner, Translate, ViewerContext } from '~/components'
import { PayToMutation } from '~/gql/graphql'

import { BaseDonationDialogProps, Step } from './types'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

interface SetAmountOpenTabCallbackValues {
  window: Window
  transaction: PayToMutation['payTo']['transaction']
}

export type DonationDialogContentProps = BaseDonationDialogProps & {
  closeDialog: () => void
  forward: (step: Step) => void
  back: () => void
  currStep: Step
}

const DynamicPayToFormComplete = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/Complete'),
  { loading: () => <Spinner /> }
)
const DynamicPayToFormConfirm = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/Confirm'),
  { loading: () => <Spinner /> }
)
const DynamicPayToFormCurrencyChoice = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/CurrencyChoice'),
  { loading: () => <Spinner /> }
)
const DynamicWalletAuthFormSelect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Select'),
  { ssr: false, loading: () => <Spinner /> }
)
const DynamicPayToFormSetAmount = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/SetAmount'),
  { loading: () => <Spinner /> }
)
const DynamicPaymentProcessingForm = dynamic(
  () => import('~/components/Forms/PaymentForm/Processing'),
  { loading: () => <Spinner /> }
)
const DynamicPaymentResetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ResetPassword'),
  { loading: () => <Spinner /> }
)
const DynamicPaymentSetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/SetPassword'),
  { loading: () => <Spinner /> }
)
const DynamicAddCreditForm = dynamic(
  () => import('~/components/Forms/PaymentForm/AddCredit'),
  { loading: () => <Spinner /> }
)

const DonationDialogContent = ({
  closeDialog: baseCloseDialog,
  forward,
  back,
  currStep,
  completeCallback,
  recipient,
  targetId,
  article,
}: DonationDialogContentProps) => {
  const viewer = useContext(ViewerContext)
  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)

  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)
  const [payToTx, setPayToTx] =
    useState<Omit<PayToMutation['payTo']['transaction'], '__typename'>>()
  const [tabUrl, setTabUrl] = useState('')
  const [tx, setTx] = useState<PayToMutation['payTo']['transaction']>()

  const setAmountCallback = (values: SetAmountCallbackValues) => {
    setAmount(values.amount)
    setCurrency(values.currency)
    if (values.currency === CURRENCY.HKD) {
      forward(
        viewer.status?.hasPaymentPassword ? 'confirm' : 'setPaymentPassword'
      )
    } else {
      forward('confirm')
    }
  }

  const setAmountOpenTabCallback = (values: SetAmountOpenTabCallbackValues) => {
    setWindowRef(values.window)
    setPayToTx(values.transaction)
    forward('processing')
  }

  const closeDialog = () => {
    forward('currencyChoice')
    setCurrency(CURRENCY.HKD)
    baseCloseDialog()
  }

  /**
   * Wallet
   */
  const isWalletSelect = currStep === 'walletSelect'

  /**
   * Donation
   */
  const isCurrencyChoice = currStep === 'currencyChoice'
  // complete dialog for donation
  const isComplete = currStep === 'complete'
  // set donation amount
  const isSetAmount = currStep === 'setAmount'
  // confirm donation amount
  const isConfirm = currStep === 'confirm'
  // processing
  const isProcessing = currStep === 'processing'

  /**
   * Add Credit
   */
  const isAddCredit = currStep === 'addCredit'

  /**
   * Password
   */
  const isResetPassword = currStep === 'resetPassword'
  const isSetPaymentPassword = currStep === 'setPaymentPassword'

  return (
    <>
      {isCurrencyChoice && (
        <DynamicPayToFormCurrencyChoice
          recipient={recipient}
          article={article}
          switchToSetAmount={(c: CURRENCY) => {
            setCurrency(c)
            forward('setAmount')
          }}
          switchToWalletSelect={() => {
            forward('walletSelect')
          }}
          closeDialog={closeDialog}
        />
      )}

      {isWalletSelect && (
        <DynamicWalletAuthFormSelect
          purpose="dialog"
          submitCallback={() => {
            forward('currencyChoice')
          }}
          back={() => {
            forward('currencyChoice')
          }}
          closeDialog={closeDialog}
        />
      )}

      {isSetAmount && (
        <DynamicPayToFormSetAmount
          currency={currency}
          recipient={recipient}
          article={article}
          submitCallback={setAmountCallback}
          switchToAddCredit={() => {
            forward('addCredit')
          }}
          setTabUrl={setTabUrl}
          setTx={setTx}
          targetId={targetId}
        />
      )}

      {isConfirm && (
        <DynamicPayToFormConfirm
          article={article}
          amount={amount}
          currency={currency}
          recipient={recipient}
          switchToSetAmount={() => forward('setAmount')}
          submitCallback={() => forward('processing')}
          targetId={targetId}
          openTabCallback={setAmountOpenTabCallback}
          tabUrl={tabUrl}
          tx={tx}
        />
      )}

      {isProcessing && (
        <DynamicPaymentProcessingForm
          amount={amount}
          currency={currency}
          recipient={recipient}
          closeDialog={closeDialog}
          prevStep={() => forward('confirm')}
          nextStep={() => {
            closeDialog()
          }}
          txId={payToTx?.id || ''}
          windowRef={windowRef}
          article={article}
          targetId={targetId}
          switchToConfirm={() => forward('confirm')}
          switchToCurrencyChoice={() => forward('currencyChoice')}
        />
      )}

      {isComplete && (
        <DynamicPayToFormComplete
          callback={completeCallback}
          recipient={recipient}
          targetId={targetId}
          amount={amount}
          currency={currency}
          switchToBindWallet={() => {}}
        />
      )}

      {isSetPaymentPassword && (
        <DynamicPaymentSetPasswordForm
          submitCallback={() => forward('confirm')}
          switchToSetAmount={() => forward('setAmount')}
          recipient={recipient}
          amount={amount}
          currency={currency}
        />
      )}

      {isAddCredit && (
        <DynamicAddCreditForm
          closeDialog={closeDialog}
          callback={() => forward('setAmount')}
          callbackText={
            <Translate
              zh_hant="回到支持"
              zh_hans="回到支持"
              en="Back to support"
            />
          }
        />
      )}

      {isResetPassword && (
        <DynamicPaymentResetPasswordForm
          callback={() => forward('setAmount')}
          callbackText={
            <Translate
              zh_hant="回到支持"
              zh_hans="回到支持"
              en="Back to support"
            />
          }
          closeDialog={closeDialog}
          back={() => forward('currencyChoice')}
        />
      )}
    </>
  )
}

export default DonationDialogContent
