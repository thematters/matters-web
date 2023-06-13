import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import {
  Button,
  IconFiatCurrency40,
  IconLikeCoin40,
  IconUSDTActive40,
  TextIcon,
  Translate,
} from '~/components'

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
          icon={<IconUSDTActive40 size="md" />}
          size="md"
          spacing="xtight"
          weight="md"
        >
          USDT
        </TextIcon>
      )}
      {isHKD && (
        <TextIcon
          icon={<IconFiatCurrency40 size="md" />}
          size="md"
          spacing="xtight"
          weight="md"
        >
          <Translate zh_hant="法幣 HKD" zh_hans="法币 HKD" en="HKD" />
        </TextIcon>
      )}
      {isLike && (
        <TextIcon
          icon={<IconLikeCoin40 size="md" />}
          size="md"
          spacing="xtight"
          weight="md"
        >
          LikeCoin
        </TextIcon>
      )}

      <span className={styles.changeButton}>
        <Button onClick={switchToCurrencyChoice}>
          <TextIcon size="xs" textDecoration="underline" color="greyDark">
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
