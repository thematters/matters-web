import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Spinner, useStep, ViewerContext } from '~/components'
import { PayToMutation } from '~/gql/graphql'

import DonationTabs, { CurrencyType } from './Tabs'
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
  { loading: () => <Spinner /> }
)

const DynamicPayToFormConfirm = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/Confirm'),
  { loading: () => <Spinner /> }
)

export type SupportAuthorProps = BaseSupportAuthorProps & {
  updateSupportStep: (step: SupportStep) => void
}

const SupportAuthor = (props: SupportAuthorProps) => {
  const { recipient, targetId, article, updateSupportStep } = props
  const viewer = useContext(ViewerContext)
  const [, setWindowRef] = useState<Window | undefined>(undefined)
  const [type, setType] = useState<CurrencyType>('credit')
  const { currStep, forward: _forward } = useStep<SupportStep>('setAmount')

  const forward = (step: SupportStep) => {
    _forward(step)
    updateSupportStep(step)
  }

  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)

  const [, setPayToTx] =
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

  const isSetAmount = currStep === 'setAmount'
  const isConfirm = currStep === 'confirm'

  return (
    <>
      {isSetAmount && (
        <>
          <DonationTabs
            type={type}
            setType={setType}
            recipient={props.recipient}
          />
          <DynamicPayToFormSetAmount
            currency={CURRENCY.HKD}
            recipient={recipient}
            article={article}
            submitCallback={setAmountCallback}
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
          switchToResetPassword={() => forward('resetPassword')}
          targetId={targetId}
          openTabCallback={setAmountOpenTabCallback}
          tabUrl={tabUrl}
          tx={tx}
        />
      )}
    </>
  )
}

export default SupportAuthor