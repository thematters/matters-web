import { useContext } from 'react'

import {
  Avatar,
  Button,
  CopyToClipboard,
  IconCopy16,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount, maskAddress, translate } from '~/common/utils'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
interface PaymentInfoProps {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
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
  const { lang } = useContext(LanguageContext)
  const address = recipient.info.ethAddress || ''
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
      {showEthAddress && (
        <div className="address">
          <CopyToClipboard text={address}>
            <Button
              spacing={['xxtight', 'tight']}
              bgColor="green-lighter"
              aria-label={translate({ id: 'copy', lang })}
            >
              <TextIcon
                icon={<IconCopy16 color="green" size="sm" />}
                spacing="xxtight"
                size="xs"
                weight="md"
                color="green"
                textPlacement="left"
              >
                {maskAddress(address)}
              </TextIcon>
            </Button>
          </CopyToClipboard>
        </div>
      )}
      {showLikerID && (
        <div className="address">
          <Button spacing={['xxtight', 'tight']} bgColor="green-lighter">
            <TextIcon size="xs" weight="md" color="green">
              LikeID: {recipient.liker.likerId}
            </TextIcon>
          </Button>
        </div>
      )}
      <p className="amount">
        <b>
          {currency} {formatAmount(amount, currency === CURRENCY.USDT ? 2 : 0)}
        </b>
      </p>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

export default PaymentInfo
