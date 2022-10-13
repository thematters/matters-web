import { Avatar, Translate } from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'

import styles from './styles.css'

import { UserDonationRecipient } from '@/src/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
interface PaymentInfoProps {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
  children?: React.ReactNode
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  amount,
  currency,
  recipient,
  children,
}) => {
  return (
    <section className="info">
      <p className="to">
        <Translate
          zh_hant="你將遞出支持資金給"
          zh_hans="你将递出支持资金给"
          en="You will hand over support funds to"
        />
      </p>
      <Avatar user={recipient} size="xxxl" />
      <p className="recipient">{recipient.displayName}</p>

      <p className="amount">
        <b>
          {currency} {amount}
        </b>
      </p>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

export default PaymentInfo
