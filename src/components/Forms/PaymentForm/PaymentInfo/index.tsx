import { FormattedMessage, useIntl } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount, truncate } from '~/common/utils'
import {
  Avatar,
  Button,
  CopyToClipboard,
  IconCopy16,
  TextIcon,
  Translate,
} from '~/components'
import { UserDonationRecipientFragment } from '~/gql/graphql'

import styles from './styles.module.css'
interface PaymentInfoProps {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipientFragment
  children?: React.ReactNode
  showLikerID?: boolean
  showEthAddress?: boolean
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  amount,
  currency,
  recipient,
  children,
  showLikerID = false,
  showEthAddress = false,
}) => {
  const intl = useIntl()
  const address = recipient.info.ethAddress || ''
  return (
    <section className={styles.info}>
      <p className={styles.to}>
        <Translate
          zh_hant="你將遞出支持資金給"
          zh_hans="你将递出支持资金给"
          en="You will support"
        />
      </p>
      <Avatar user={recipient} size="xxxl" />
      <p className={styles.recipient}>{recipient.displayName}</p>
      {showEthAddress && (
        <div className={styles.address}>
          <CopyToClipboard
            text={address}
            successMessage={
              <FormattedMessage defaultMessage="Address copied" id="+aMAeT" />
            }
          >
            <Button
              spacing={['xxtight', 'tight']}
              bgColor="greenLighter"
              aria-label={intl.formatMessage({
                defaultMessage: 'Copy',
                id: '4l6vz1',
              })}
            >
              <TextIcon
                icon={<IconCopy16 color="green" size="sm" />}
                spacing="xxtight"
                size="md"
                color="green"
                textPlacement="left"
              >
                {truncate(address)}
              </TextIcon>
            </Button>
          </CopyToClipboard>
        </div>
      )}
      {showLikerID && (
        <div className={styles.address}>
          <Button spacing={['xxtight', 'tight']} bgColor="greenLighter">
            <TextIcon size="xs" weight="md" color="green">
              LikeID: {recipient.liker.likerId}
            </TextIcon>
          </Button>
        </div>
      )}

      <p className={styles.amount}>
        <b>
          {currency} {formatAmount(amount, currency === CURRENCY.USDT ? 2 : 0)}
        </b>
      </p>

      {children}
    </section>
  )
}

export default PaymentInfo
