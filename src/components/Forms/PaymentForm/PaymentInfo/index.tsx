import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCopy } from '@/public/static/icons/24px/copy.svg'
import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount, truncate } from '~/common/utils'
import {
  Avatar,
  Button,
  CopyToClipboard,
  Icon,
  TextIcon,
  Viewer,
} from '~/components'
import { UserDonationRecipientFragment } from '~/gql/graphql'

import styles from './styles.module.css'
interface PaymentInfoProps {
  recipient: UserDonationRecipientFragment | Viewer
  amount?: number
  currency?: CURRENCY
  children?: React.ReactNode
  showLikerID?: boolean
  showEthAddress?: boolean
  isInBindWallet?: boolean
  address?: string
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  amount,
  currency,
  recipient,
  children,
  showLikerID = false,
  showEthAddress = false,
  isInBindWallet = false,
  address: _address,
}) => {
  const intl = useIntl()
  const address = _address || recipient.info.ethAddress || ''
  return (
    <section className={styles.info}>
      {!isInBindWallet && (
        <p className={styles.to}>
          <FormattedMessage
            defaultMessage="Provide support funds to"
            id="BoN8lF"
            description="src/components/Forms/PaymentForm/PaymentInfo/index.tsx"
          />
        </p>
      )}
      <Avatar user={recipient} size="xxxlm" />
      <p className={styles.recipient}>{recipient.displayName}</p>
      {showEthAddress && (
        <div className={styles.address}>
          <CopyToClipboard
            text={address}
            successMessage={
              <FormattedMessage defaultMessage="Address copied" id="+aMAeT" />
            }
          >
            {({ copyToClipboard }) => (
              <Button
                spacing={['xxtight', 'tight']}
                bgColor="greenLighter"
                aria-label={intl.formatMessage({
                  defaultMessage: 'Copy',
                  id: '4l6vz1',
                })}
                onClick={copyToClipboard}
              >
                <TextIcon
                  icon={<Icon icon={IconCopy} color="green" size="sm" />}
                  spacing="xxtight"
                  size="md"
                  color="green"
                  textPlacement="left"
                >
                  {truncate(address)}
                </TextIcon>
              </Button>
            )}
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

      {!isInBindWallet && (
        <p className={styles.amount}>
          <b>
            {currency}{' '}
            {formatAmount(amount || 0, currency === CURRENCY.USDT ? 2 : 0)}
          </b>
        </p>
      )}

      {children}
    </section>
  )
}

export default PaymentInfo
