import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Spinner, useStep, ViewerContext } from '~/components'
import { PayToMutation } from '~/gql/graphql'

import DonationTabs, { CurrencyType } from './Tabs'
import { BaseSupportAuthorProps } from './types'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

const DynamicPayToFormSetAmount = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/SetAmount'),
  { loading: () => <Spinner /> }
)

export type SupportAuthorProps = BaseSupportAuthorProps & {
  updateSupportStep: (step: SupportStep) => void
}

export type SupportStep =
  | 'setAmount'
  | 'topup'
  | 'currencyChoice'
  | 'confirm'
  | 'complete'
  | 'processing'
  | 'resetPassword'
  | 'setPaymentPassword'

export const SupportAuthor = (props: SupportAuthorProps) => {
  const { recipient, targetId, article, updateSupportStep } = props
  const viewer = useContext(ViewerContext)
  const [type, setType] = useState<CurrencyType>('credit')
  const { currStep, forward: _forward } = useStep<SupportStep>('setAmount')

  const forward = (step: SupportStep) => {
    _forward(step)
    updateSupportStep(step)
  }

  const [, setAmount] = useState<number>(0)
  const [, setCurrency] = useState<CURRENCY>(CURRENCY.HKD)

  // const [payToTx, setPayToTx] =
  //   useState<Omit<PayToMutation['payTo']['transaction'], '__typename'>>()
  const [, setTabUrl] = useState('')
  const [, setTx] = useState<PayToMutation['payTo']['transaction']>()

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

  const isSetAmount = currStep === 'setAmount'

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
            switchToCurrencyChoice={() => {
              forward('currencyChoice')
            }}
            switchToAddCredit={() => {
              forward('topup')
            }}
            back={() => {
              forward('currencyChoice')
            }}
            setTabUrl={setTabUrl}
            setTx={setTx}
            targetId={targetId}
          />
        </>
      )}
    </>
  )
}
