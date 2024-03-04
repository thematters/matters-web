import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Spinner, useStep, ViewerContext } from '~/components'
import { PayToMutation } from '~/gql/graphql'

import { BaseSupportAuthorProps } from '../types'

interface SetAmountCallbackValues {
  amount: number
  currency: CURRENCY
}

const DynamicPayToFormSetAmount = dynamic(
  () => import('~/components/Forms/PaymentForm/PayTo/SetAmount'),
  { loading: () => <Spinner /> }
)

type creditDrawerProps = BaseSupportAuthorProps

type Step =
  | 'setAmount'
  | 'addCredit'
  | 'currencyChoice'
  | 'confirm'
  | 'complete'
  | 'processing'
  | 'resetPassword'
  | 'setPaymentPassword'

export const CreditCard = ({
  completeCallback,
  recipient,
  targetId,
  article,
}: creditDrawerProps) => {
  const viewer = useContext(ViewerContext)
  // const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)

  const { currStep, forward } = useStep<Step>('setAmount')

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
        <DynamicPayToFormSetAmount
          currency={CURRENCY.HKD}
          recipient={recipient}
          article={article}
          submitCallback={setAmountCallback}
          switchToCurrencyChoice={() => {
            forward('currencyChoice')
          }}
          switchToAddCredit={() => {
            forward('addCredit')
          }}
          back={() => {
            forward('currencyChoice')
          }}
          setTabUrl={setTabUrl}
          setTx={setTx}
          targetId={targetId}
        />
      )}
    </>
  )
}
