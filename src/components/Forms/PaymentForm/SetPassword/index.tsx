import _pickBy from 'lodash/pickBy'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Dialog, SetPaymentPasswordForm, Spacer, useStep } from '~/components'
import { UserDonationRecipientFragment } from '~/gql/graphql'

import PaymentInfo from '../PaymentInfo'
import styles from './styles.module.css'

interface FormProps {
  submitCallback: () => void
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  switchToSetAmount: () => void
  loadingConponent?: React.ReactNode
}

const PaymentSetPasswordForm: React.FC<FormProps> = ({
  submitCallback,
  amount,
  currency,
  recipient,
  switchToSetAmount,
}) => {
  const { currStep, forward } = useStep<'password' | 'comparedPassword'>(
    'password'
  )
  const isInPassword = currStep === 'password'
  const isInComparedPassword = currStep === 'comparedPassword'

  return (
    <section className={styles.container}>
      <PaymentInfo amount={amount} currency={currency} recipient={recipient} />

      <p className={styles.hint}>
        {isInPassword && (
          <FormattedMessage
            defaultMessage="Welcome to use your wallet! {br} Please set a transaction password first"
            id="1WeErK"
            values={{ br: <br /> }}
            description="src/components/Forms/PaymentForm/SetPassword/index.tsx"
          />
        )}
        {isInComparedPassword && (
          <FormattedMessage
            defaultMessage="Please confirm transaction password"
            id="RU5NDB"
            description="src/components/Forms/PaymentForm/SetPassword/index.tsx"
          />
        )}
      </p>

      <SetPaymentPasswordForm
        submitCallback={submitCallback}
        step={currStep}
        forward={forward}
      />

      <Spacer size="loose" />
      <Dialog.RoundedButton
        color="black"
        onClick={switchToSetAmount}
        borderColor="greyLight"
        borderWidth="sm"
        textWeight="normal"
        borderActiveColor="grey"
        text={
          <FormattedMessage
            defaultMessage="Back"
            id="QfrKA6"
            description="src/components/Forms/PaymentForm"
          />
        }
      />
    </section>
  )
}

export default PaymentSetPasswordForm
