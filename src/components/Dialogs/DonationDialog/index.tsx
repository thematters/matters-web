import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import {
  Dialog,
  Spinner,
  Translate,
  useDialogSwitch,
  useStep,
  ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { analytics } from '~/common/utils'

import { PayTo_payTo_transaction as PayToTx } from '~/components/GQL/mutations/__generated__/PayTo'
import { ArticleDetailPublic_article } from '~/views/ArticleDetail/__generated__/ArticleDetailPublic'
import { UserDonationRecipient } from './__generated__/UserDonationRecipient'

type Step =
  | 'currencyChoice'
  | 'walletSelect'
  | 'setAmount'
  | 'addCredit'
  | 'complete'
  | 'confirm'
  | 'processing'
  | 'resetPassword'
  | 'setPaymentPassword'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

interface SetAmountOpenTabCallbackValues {
  window: Window
  transaction: PayToTx
}

interface DonationDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  completeCallback?: () => void
  defaultStep?: Step
  recipient: UserDonationRecipient
  article: ArticleDetailPublic_article
  targetId: string
}

const DynamicPayToFormComplete = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/Complete'),
  { loading: Spinner }
)
const DynamicPayToFormConfirm = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/Confirm'),
  { loading: Spinner }
)

const DynamicPayToFormCurrencyChoice = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/CurrencyChoice/index'),
  { loading: Spinner }
)

const DynamicWalletAuthFormSelect = dynamic(
  () => import('~/components/Forms/WalletAuthForm/Select'),
  { ssr: false, loading: Spinner }
)

const DynamicPayToFormSetAmount = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/SetAmount'),
  { loading: Spinner }
)
const DynamicPaymentProcessingForm = dynamic(
  () => import('~/components/Forms/PaymentForm/Processing'),
  { loading: Spinner }
)
const DynamicPaymentResetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ResetPassword'),
  { loading: Spinner }
)
const DynamicPaymentSetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/SetPassword'),
  { loading: Spinner }
)
const DynamicAddCreditForm = dynamic(
  () => import('~/components/Forms/PaymentForm/AddCredit'),
  { loading: Spinner }
)

const fragments = {
  recipient: gql`
    fragment UserDonationRecipient on User {
      id
      liker {
        likerId
        civicLiker
      }
      info {
        ethAddress
      }
      ...UserDigestMiniUser
    }
    ${UserDigest.Mini.fragments.user}
  `,
}

const BaseDonationDialog = ({
  children,
  completeCallback,
  defaultStep = 'currencyChoice',
  recipient,
  targetId,
  article,
}: DonationDialogProps) => {
  const viewer = useContext(ViewerContext)

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)
  const { currStep, forward, back } = useStep<Step>(defaultStep)
  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)

  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)
  const [payToTx, setPayToTx] = useState<Omit<PayToTx, '__typename'>>()
  const [tabUrl, setTabUrl] = useState('')
  const [tx, setTx] = useState<PayToTx>()

  const openDialog = () => {
    forward(defaultStep)
    baseOpenDialog()
  }

  const closeDialog = () => {
    setCurrency(CURRENCY.HKD)
    baseCloseDialog()
  }

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

  const ContinueDonationButton = (
    <Dialog.Footer.Button onClick={() => forward('setAmount')}>
      <Translate zh_hant="回到支持" zh_hans="回到支持" />
    </Dialog.Footer.Button>
  )

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

  // const isHKD = currency === CURRENCY.HKD

  useEffect(() => {
    analytics.trackEvent('view_donation_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ openDialog })}

      <Dialog
        size={isComplete ? 'lg' : 'sm'}
        isOpen={show}
        onDismiss={closeDialog}
        fixedHeight
      >
        {!isProcessing && !isWalletSelect && (
          <Dialog.Header
            closeDialog={closeDialog}
            leftButton={
              isAddCredit ? (
                <Dialog.Header.BackButton onClick={back} />
              ) : (
                <Dialog.Header.CloseButton closeDialog={closeDialog} />
              )
            }
            title={
              isAddCredit
                ? 'topUp'
                : isSetPaymentPassword
                ? 'paymentPassword'
                : isResetPassword
                ? 'resetPaymentPassword'
                : isComplete
                ? 'successDonation'
                : 'donation'
            }
          />
        )}

        {isCurrencyChoice && (
          <DynamicPayToFormCurrencyChoice
            recipient={recipient}
            switchToSetAmount={(c: CURRENCY) => {
              setCurrency(c)
              forward('setAmount')
            }}
            switchToWalletSelect={() => {
              forward('walletSelect')
            }}
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
            submitCallback={setAmountCallback}
            switchToCurrencyChoice={() => {
              forward('currencyChoice')
            }}
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
            amount={amount}
            currency={currency}
            recipient={recipient}
            switchToSetAmount={() => forward('setAmount')}
            submitCallback={() => forward('processing')}
            switchToResetPassword={() => forward('resetPassword')}
            switchToCurrencyChoice={() => forward('currencyChoice')}
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
            nextStep={() => forward('complete')}
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
          />
        )}

        {isSetPaymentPassword && (
          <DynamicPaymentSetPasswordForm
            submitCallback={() => forward('confirm')}
          />
        )}

        {isAddCredit && (
          <DynamicAddCreditForm callbackButtons={ContinueDonationButton} />
        )}

        {isResetPassword && (
          <DynamicPaymentResetPasswordForm
            callbackButtons={ContinueDonationButton}
            closeDialog={closeDialog}
          />
        )}
      </Dialog>
    </>
  )
}

export const DonationDialog = (props: DonationDialogProps) => (
  <Dialog.Lazy mounted={<BaseDonationDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

DonationDialog.fragments = fragments
