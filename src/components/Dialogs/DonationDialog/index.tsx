import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import {
  Dialog,
  PaymentForm,
  Spinner,
  Translate,
  ViewerContext,
} from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { numRound } from '~/common/utils'

import { AddCredit_addCredit_transaction as AddCreditTx } from '~/components/Forms/PaymentForm/AddCredit/__generated__/AddCredit'
import {
  PayTo_payTo as PayToResult,
  PayTo_payTo_transaction as PayToTx,
} from '~/components/GQL/mutations/__generated__/PayTo'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'
import { UserDonationRecipient } from './__generated__/UserDonationRecipient'

type Step =
  | 'addCredit'
  | 'addCreditComplete'
  | 'addCreditProcessing'
  | 'checkout'
  | 'complete'
  | 'confirm'
  | 'processing'
  | 'setAmount'
  | 'setPaymentPassword'

export type SetAmountCallbackValues = {
  amount: number
  currency: CURRENCY
} & Partial<Omit<PayToResult, '__typename'>>

interface AddCreditData {
  transaction: AddCreditTx | undefined
  client_secret: string
}

interface DonationDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
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
  defaultStep = 'setAmount',
  recipient,
  targetId,
}: DonationDialogProps) => {
  const baseAddCreditData = { transaction: undefined, client_secret: '' }

  const viewer = useContext(ViewerContext)

  const [showDialog, setShowDialog] = useState(true)
  const [step, setStep] = useState<Step>(defaultStep)
  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)

  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.LIKE)
  const [payToTx, setPayToTx] = useState<Omit<PayToTx, '__typename'>>()
  const [addCreditData, setAddCreditData] = useState<AddCreditData>(
    baseAddCreditData
  )

  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE)

  const open = () => {
    setAddCreditData(baseAddCreditData)
    setStep(defaultStep)
    setShowDialog(true)
  }

  const close = () => setShowDialog(false)

  const setAmountCallback = (values: SetAmountCallbackValues) => {
    setAmount(values.amount)
    setCurrency(values.currency)

    switch (values.currency) {
      case CURRENCY.LIKE:
        const redirectWindow = window.open(values.redirectUrl, '_blank')
        if (redirectWindow) {
          setWindowRef(redirectWindow)
          setPayToTx(values.transaction)
          setStep('processing')
        }
        break
      case CURRENCY.HKD:
        setStep('confirm')
        break
    }
  }

  const switchToLike = () => {
    setAmount(160)
    setCurrency(CURRENCY.LIKE)
    setStep('setAmount')
  }

  const switchToAddCredit = () => {
    setAddCreditData(baseAddCreditData)
    setStep(
      viewer.status?.hasPaymentPassword ? 'addCredit' : 'setPaymentPassword'
    )
  }

  const addCreditCallback = ({ transaction, client_secret }: any) => {
    setAddCreditData({ ...addCreditData, transaction, client_secret })
    setStep('checkout')
  }

  if (loading) {
    return <Spinner />
  }

  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0

  const isAddCredit = step === 'addCredit'
  const isAddCreditComplete = step === 'addCreditComplete'
  const isAddCreditProcessing = step === 'addCreditProcessing'
  const isCheckout = step === 'checkout'
  const isComplete = step === 'complete'
  const isConfirm = step === 'confirm'
  const isProcessing = step === 'processing'
  const isSetAmount = step === 'setAmount'
  const isSetPaymentPassword = step === 'setPaymentPassword'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          close={close}
          closeTextId="close"
          title={
            isAddCredit
              ? 'topUp'
              : isSetPaymentPassword
              ? 'paymentPassword'
              : 'donation'
          }
        />

        {isSetAmount && (
          <PaymentForm.PayTo.SetAmount
            close={close}
            submitCallback={setAmountCallback}
            recipient={recipient}
            targetId={targetId}
          />
        )}

        {isConfirm && (
          <PaymentForm.PayTo.Confirm
            amount={amount}
            balance={balanceHKD}
            currency={currency}
            recipient={recipient}
            submitCallback={() => setStep('processing')}
            switchToAddCredit={switchToAddCredit}
            switchToLike={switchToLike}
            targetId={targetId}
          />
        )}

        {isSetPaymentPassword && (
          <PaymentForm.SetPassword
            submitCallback={() => setStep('addCredit')}
          />
        )}

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
            submitCallback={() => setStep('processing')}
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
            footerButtons={
              <Dialog.Footer.Button
                type="button"
                bgColor="green"
                textColor="white"
                onClick={() => setStep('confirm')}
              >
                <Translate zh_hant="繼續支付" zh_hans="继续支付" />
              </Dialog.Footer.Button>
            }
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
            currency={currency}
            recipient={recipient}
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
