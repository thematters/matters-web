import { useQuery } from '@apollo/client'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import { useEffect, useState } from 'react'

import { Dialog, SpinnerBlock } from '~/components'
import {
  DigestRichCirclePrivateFragment,
  DigestRichCirclePublicFragment,
  WalletPaymentMethodQuery,
} from '~/gql/graphql'

import CardPayment from './CardPayment'
import { WALLET_PAYMENT_METHOD } from './gql'
import PasswordPayment from './PasswordPayment'

interface FormProps {
  circle: DigestRichCirclePublicFragment & DigestRichCirclePrivateFragment
  submitCallback: () => void
  switchToResetPassword: () => void
  closeDialog: () => void
}

const SubscribeCircleForm: React.FC<FormProps> = (props) => {
  const { data: walletData, loading } = useQuery<WalletPaymentMethodQuery>(
    WALLET_PAYMENT_METHOD
  )
  const cardLast4 = walletData?.viewer?.wallet.cardLast4 || ''

  const [isCardPayment, setIsCardPayment] = useState(!cardLast4)
  const switchToCardPayment = () => setIsCardPayment(true)

  useEffect(() => {
    setIsCardPayment(!cardLast4)
  }, [cardLast4])

  if (loading) {
    return (
      <Dialog.Content>
        <SpinnerBlock />
      </Dialog.Content>
    )
  }

  if (isCardPayment) {
    return <CardPayment {...props} />
  }

  return (
    <PasswordPayment
      {...props}
      cardLast4={cardLast4}
      switchToCardPayment={switchToCardPayment}
    />
  )
}

export default SubscribeCircleForm
