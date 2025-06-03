import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import {
  CLOSE_SET_PAYMENT_PASSWORD_DIALOG,
  OPEN_SET_PAYMENT_PASSWORD_DIALOG,
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_TAB_PREFERENCE_KEY,
} from '~/common/enums'
import { storage } from '~/common/utils'
import {
  AuthWalletFeed,
  SetPaymentPasswordDialog,
  Spacer,
  SpinnerBlock,
  useCurationNetwork,
  useStep,
  ViewerContext,
} from '~/components'
import PaymentProcessingForm from '~/components/Forms/PaymentForm/Processing'
import { PayToMutation } from '~/gql/graphql'

import { DisableSupport } from './DisableSupport'
import DonationTabs from './Tabs'
import { BaseSupportAuthorProps, Step as SupportStep } from './types'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

interface SetAmountOpenTabCallbackValues {
  window: Window
  transaction: PayToMutation['payTo']['transaction']
}

const DynamicPayToFormSetAmount = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/SetAmount'),
  { loading: () => <SpinnerBlock /> }
)

const DynamicPayToFormConfirm = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/Confirm'),
  { loading: () => <SpinnerBlock /> }
)

const DynamicPayToFormComplete = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/Complete'),
  { loading: () => <SpinnerBlock /> }
)

const DynamicAddCreditForm = dynamic(
  () => import('~/components/Forms/PaymentForm/AddCredit'),
  { loading: () => <SpinnerBlock /> }
)

const DynamicSwitchNetworkForm = dynamic(
  () => import('~/components/Forms/PaymentForm/SwitchNetwork'),
  { loading: () => <SpinnerBlock /> }
)

const DynamicBindWalletForm = dynamic(
  () => import('~/components/Forms/PaymentForm/BindWallet'),
  { loading: () => <SpinnerBlock /> }
)

export type SupportAuthorProps = BaseSupportAuthorProps & {
  updateSupportStep: (step: SupportStep) => void
  onClose: () => void
}

const SupportAuthor = (props: SupportAuthorProps) => {
  const { recipient, targetId, article, updateSupportStep, onClose } = props
  const viewer = useContext(ViewerContext)
  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)
  const { currStep, forward: _forward } = useStep<SupportStep>('setAmount')
  const hasAuthorLikeID = !!recipient.liker.likerId
  const supportCurrency = storage.get<CURRENCY>(SUPPORT_TAB_PREFERENCE_KEY)

  const { address } = useAccount()
  const { isUnsupportedNetwork } = useCurationNetwork()

  const forward = (step: SupportStep) => {
    _forward(step)
    updateSupportStep(step)
  }

  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<CURRENCY>(
    supportCurrency || CURRENCY.HKD
  )

  const switchCurrency = async (currency: CURRENCY) => {
    setAmount(0)
    setCurrency(currency)
  }

  const reset = () => {
    setAmount(0)
    forward('setAmount')
  }

  const isLikecoin = currency === CURRENCY.LIKE

  const [payToTx, setPayToTx] =
    useState<Omit<PayToMutation['payTo']['transaction'], '__typename'>>()
  const [tabUrl, setTabUrl] = useState('')
  const [tx, setTx] = useState<PayToMutation['payTo']['transaction']>()

  const setAmountCallback = (values: SetAmountCallbackValues) => {
    setAmount(values.amount)
    setCurrency(values.currency)
    if (
      values.currency === CURRENCY.HKD &&
      !viewer.status?.hasPaymentPassword
    ) {
      window.dispatchEvent(
        new CustomEvent(OPEN_SET_PAYMENT_PASSWORD_DIALOG, {
          detail: {
            submitCallback: () => {
              forward('confirm')
              window.dispatchEvent(
                new CustomEvent(CLOSE_SET_PAYMENT_PASSWORD_DIALOG)
              )
            },
          },
        })
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

  useEffect(() => {
    if (currency === CURRENCY.USDT) {
      forward('walletSelect')
    } else {
      forward('setAmount')
    }
  }, [currency])

  useEffect(() => {
    if (currency !== CURRENCY.USDT) {
      return
    }

    if (!address) {
      forward('walletSelect')
      return
    }

    if (isUnsupportedNetwork) {
      forward('networkSelect')
      return
    }
  }, [address, isUnsupportedNetwork])

  const isSetAmount = currStep === 'setAmount'
  const isConfirm = currStep === 'confirm'
  const isProcessing = currStep === 'processing'
  const isComplete = currStep === 'complete'
  const isTopup = currStep === 'topup'
  const isWalletSelect = currStep === 'walletSelect'
  const isNetworkSelect = currStep === 'networkSelect'
  const isBindWallet = currStep === 'bindWallet'

  const showTabs = isSetAmount || isWalletSelect || isNetworkSelect

  if (!hasAuthorLikeID && isLikecoin) {
    return (
      <DisableSupport
        currency={currency}
        setCurrency={switchCurrency}
        onClose={onClose}
      />
    )
  }

  return (
    <>
      <SetPaymentPasswordDialog />
      {showTabs && (
        <DonationTabs currency={currency} setCurrency={switchCurrency} />
      )}
      {isSetAmount && (
        <>
          <DynamicPayToFormSetAmount
            amount={amount}
            setAmount={setAmount}
            currency={currency}
            recipient={recipient}
            article={article}
            submitCallback={(value) => {
              setAmountCallback(value)
            }}
            switchToAddCredit={() => {
              forward('topup')
            }}
            setTabUrl={setTabUrl}
            setTx={setTx}
            targetId={targetId}
          />
        </>
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
        <PaymentProcessingForm
          amount={amount}
          currency={currency}
          recipient={recipient}
          closeDialog={() => {}}
          prevStep={() => {
            forward('confirm')
          }}
          nextStep={() => {
            storage.set(SUPPORT_TAB_PREFERENCE_KEY, currency)
            forward('complete')
          }}
          txId={payToTx?.id || ''}
          windowRef={windowRef}
          article={article}
          targetId={targetId}
          switchToConfirm={() => forward('confirm')}
          switchToCurrencyChoice={() => {}}
        />
      )}
      {isComplete && (
        <DynamicPayToFormComplete
          callback={() => {
            reset()
            onClose()
          }}
          recipient={recipient}
          amount={amount}
          currency={currency}
          switchToBindWallet={() => forward('bindWallet')}
        />
      )}

      {isTopup && (
        <DynamicAddCreditForm
          closeDialog={onClose}
          switchToSetAmount={() => forward('setAmount')}
        />
      )}
      {isWalletSelect && (
        <>
          <Spacer size="sp40" />
          <AuthWalletFeed
            submitCallback={() => forward('networkSelect')}
            isInSupport
          />
        </>
      )}
      {isNetworkSelect && (
        <>
          <Spacer size="sp40" />
          <DynamicSwitchNetworkForm
            submitCallback={() => forward('setAmount')}
          />
        </>
      )}
      {isBindWallet && (
        <>
          <DynamicBindWalletForm
            currency={currency}
            callback={() => {
              reset()
              onClose()
            }}
          />
        </>
      )}
    </>
  )
}

export default SupportAuthor
