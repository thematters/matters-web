import _random from 'lodash/random'
import _range from 'lodash/range'
import { FormattedMessage } from 'react-intl'

import {
  CLOSE_AUTO_OPEN_COMMENT_DRAWER,
  PAYMENT_CURRENCY as CURRENCY,
  SUPPORT_SUCCESS_ANIMATION,
} from '~/common/enums'
import { Dialog, IconCircleCheck40 } from '~/components'
import { UserDonationRecipientFragment } from '~/gql/graphql'

import PaymentInfo from '../../PaymentInfo'
import styles from './styles.module.css'

interface Props {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  targetId: string
  callback?: () => void
}

const Complete: React.FC<Props> = ({
  amount,
  currency,
  callback,
  recipient,
  targetId,
}) => {
  const gotIt = () => {
    window.dispatchEvent(new CustomEvent(CLOSE_AUTO_OPEN_COMMENT_DRAWER, {}))

    window.dispatchEvent(
      new CustomEvent(SUPPORT_SUCCESS_ANIMATION, {
        detail: {
          currency,
        },
      })
    )

    if (callback) {
      callback()
    }
  }

  return (
    <section className={styles.container}>
      <PaymentInfo
        amount={amount}
        currency={currency}
        recipient={recipient}
        showLikerID={currency === CURRENCY.LIKE}
        showEthAddress={currency === CURRENCY.USDT}
      >
        <>
          <IconCircleCheck40 size="xlM" color="green" />
          <p className={styles.hint}>
            <FormattedMessage
              defaultMessage="Successfully delivered"
              id="5UglrB"
            />
          </p>
        </>
      </PaymentInfo>
      <Dialog.RoundedButton
        color="black"
        onClick={gotIt}
        borderColor="greyLight"
        borderWidth="sm"
        textWeight="normal"
        borderActiveColor="grey"
        text={
          <FormattedMessage
            defaultMessage="Got it"
            id="f45YWK"
            description="src/components/Forms/PaymentForm/PayTo/Complete/index.tsx"
          />
        }
      />
    </section>
  )
}

export default Complete
