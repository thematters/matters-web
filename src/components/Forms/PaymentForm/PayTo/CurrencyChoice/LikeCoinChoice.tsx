import { useContext } from 'react'

import {
  Button,
  CurrencyFormatter,
  IconLikeCoin40,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { PATHS } from '~/common/enums'
import { formatAmount } from '~/common/utils'

import styles from './styles.css'

import { QuoteCurrency } from '@/__generated__/globalTypes'
import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

type LikeCoinChoiceProps = {
  balance: number
  recipient: UserDonationRecipient
  currency: QuoteCurrency
  exchangeRate: number
  switchToSetAmount: () => void
}

const IconLikeDisabled = () => (
  <TextIcon
    icon={<IconLikeCoin40 size="xl-m" color="grey" />}
    size="md"
    spacing="xtight"
    color="grey"
  >
    LikeCoin
  </TextIcon>
)

const LikeCoinChoice: React.FC<LikeCoinChoiceProps> = ({
  balance,
  recipient,
  currency,
  exchangeRate,
  switchToSetAmount,
}) => {
  const viewer = useContext(ViewerContext)
  const hasLikerId = !!viewer.liker.likerId
  const canReceiveLike = !!recipient.liker.likerId

  if (!hasLikerId) {
    return (
      <section role="button" className="item">
        <IconLikeDisabled />

        <Button
          spacing={[0, 'base']}
          size={[null, '1.5rem']}
          borderColor="green"
          borderRadius="5rem"
          href={PATHS.ME_SETTINGS}
        >
          <TextIcon color="green" size="xs">
            <Translate
              zh_hant="綁定 Liker ID"
              zh_hans="綁定 Liker ID"
              en="Go to link your Liker ID"
            />
          </TextIcon>
        </Button>

        <style jsx>{styles}</style>
      </section>
    )
  }

  if (!canReceiveLike) {
    return (
      <section role="button" className="item">
        <IconLikeDisabled />

        <TextIcon size="md" color="grey">
          <Translate
            zh_hant="作者尚未啟用"
            zh_hans="作者尚未启用"
            en="The author has not opened"
          />
        </TextIcon>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section
      role="button"
      className="item clickable"
      onClick={switchToSetAmount}
    >
      <TextIcon
        icon={<IconLikeCoin40 size="xl-m" />}
        size="md"
        spacing="xtight"
      >
        LikeCoin
      </TextIcon>

      <CurrencyFormatter
        value={formatAmount(balance, 0)}
        currency="LIKE"
        subValue={formatAmount(balance * exchangeRate, 4)}
        subCurrency={currency}
      />

      <style jsx>{styles}</style>
    </section>
  )
}

export default LikeCoinChoice
