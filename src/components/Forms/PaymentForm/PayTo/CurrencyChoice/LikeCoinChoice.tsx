import { useContext } from 'react'

import { ReactComponent as IconLikeCoin } from '@/public/static/icons/24px/likecoin.svg'
import { PATHS } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  Button,
  CurrencyFormatter,
  Icon,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import { QuoteCurrency, UserDonationRecipientFragment } from '~/gql/graphql'

import styles from './styles.module.css'

type LikeCoinChoiceProps = {
  balance: number
  recipient: UserDonationRecipientFragment
  currency: QuoteCurrency
  exchangeRate: number
  switchToSetAmount: () => void
}

const IconLikeDisabled = () => (
  <TextIcon
    icon={<Icon icon={IconLikeCoin} size="xlM" color="grey" />}
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
      <section role="button" className={styles.item}>
        <IconLikeDisabled />

        <Button
          spacing={[0, 'base']}
          size={[null, '1.5rem']}
          borderColor="green"
          borderRadius="5rem"
          href={PATHS.ME_SETTINGS_MISC}
        >
          <TextIcon color="green" size="xs">
            <Translate
              zh_hant="綁定現有 Liker ID"
              zh_hans="绑定现有 Liker ID"
              en="Go to link your Liker ID"
            />
          </TextIcon>
        </Button>
      </section>
    )
  }

  if (!canReceiveLike) {
    return (
      <section className={styles.item}>
        <IconLikeDisabled />

        <TextIcon size="md" color="grey">
          <Translate
            zh_hant="作者尚未啟用"
            zh_hans="作者尚未启用"
            en="The author has not opened"
          />
        </TextIcon>
      </section>
    )
  }

  return (
    <section
      role="button"
      className={`${styles.item} ${styles.clickable}`}
      onClick={switchToSetAmount}
    >
      <TextIcon
        icon={<Icon icon={IconLikeCoin} size="xlM" />}
        size="md"
        spacing="xtight"
      >
        LikeCoin
      </TextIcon>

      <CurrencyFormatter
        value={formatAmount(balance, 0)}
        currency="LIKE"
        subValue={formatAmount(balance * exchangeRate, 2)}
        subCurrency={currency}
      />
    </section>
  )
}

export default LikeCoinChoice
