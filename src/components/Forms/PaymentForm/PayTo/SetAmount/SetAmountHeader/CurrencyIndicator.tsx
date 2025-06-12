import IconFiatCurrency from '@/public/static/icons/24px/fiat-currency.svg'
import IconLikeCoin from '@/public/static/icons/24px/likecoin.svg'
import IconTether from '@/public/static/icons/24px/tether.svg'
import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Button, Icon, TextIcon, Translate } from '~/components'

import styles from './styles.module.css'

type CurrencyIndicatorProps = {
  currency: CURRENCY
  switchToCurrencyChoice: () => void
}

const CurrencyIndicator: React.FC<CurrencyIndicatorProps> = ({
  currency,
  switchToCurrencyChoice,
}) => {
  const isUSDT = currency === CURRENCY.USDT
  const isHKD = currency === CURRENCY.HKD
  const isLike = currency === CURRENCY.LIKE

  return (
    <section>
      {isUSDT && (
        <TextIcon
          icon={<Icon icon={IconTether} size={24} />}
          size={16}
          spacing={8}
          weight="medium"
        >
          USDT
        </TextIcon>
      )}
      {isHKD && (
        <TextIcon
          icon={<Icon icon={IconFiatCurrency} size={24} />}
          size={16}
          spacing={8}
          weight="medium"
        >
          <Translate zh_hant="法幣 HKD" zh_hans="法币 HKD" en="HKD" />
        </TextIcon>
      )}
      {isLike && (
        <TextIcon
          icon={<Icon icon={IconLikeCoin} size={24} />}
          size={16}
          spacing={8}
          weight="medium"
        >
          LikeCoin
        </TextIcon>
      )}

      <span className={styles.changeButton}>
        <Button onClick={switchToCurrencyChoice}>
          <TextIcon size={12} decoration="underline" color="greyDark">
            <Translate
              zh_hant="更改支持方式"
              zh_hans="更改支持方式"
              en="Change"
            />
          </TextIcon>
        </Button>
      </span>
    </section>
  )
}

export default CurrencyIndicator
