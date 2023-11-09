import { useContext } from 'react'

import { GUIDE_LINKS, PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  BindEmailHintDialog,
  Button,
  LanguageContext,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import styles from './styles.module.css'

type SetAmountBalanceProps = {
  currency: CURRENCY
  balanceUSDT: number
  balanceHKD: number
  balanceLike: number
  isBalanceInsufficient: boolean
  switchToAddCredit: () => void
}

const SetAmountBalance: React.FC<SetAmountBalanceProps> = ({
  currency,
  balanceUSDT,
  balanceHKD,
  balanceLike,
  isBalanceInsufficient,
  switchToAddCredit,
}) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  const isUSDT = currency === CURRENCY.USDT
  const isHKD = currency === CURRENCY.HKD
  const isLike = currency === CURRENCY.LIKE

  return (
    <section className={styles.setAmountBalance}>
      <span className={styles.left}>
        <Translate zh_hant="餘額 " zh_hans="余额 " en="Balance " />
        {isUSDT && <span>{formatAmount(balanceUSDT)} USDT</span>}
        {isHKD && <span>{formatAmount(balanceHKD)} HKD</span>}
        {isLike && <span>{formatAmount(balanceLike, 0)} LIKE</span>}
      </span>

      {isHKD && (
        <BindEmailHintDialog>
          {({ openDialog }) => {
            return (
              <Button onClick={hasEmail ? switchToAddCredit : openDialog}>
                <TextIcon
                  size="xs"
                  textDecoration="underline"
                  color="green"
                  weight="md"
                >
                  {isBalanceInsufficient ? (
                    <Translate
                      zh_hant="餘額不足，請儲值"
                      zh_hans="余额不足，请储值"
                      en="Insufficient balance, please top up"
                    />
                  ) : (
                    <Translate zh_hant="儲值" zh_hans="储值" en="Top Up" />
                  )}
                </TextIcon>
              </Button>
            )
          }}
        </BindEmailHintDialog>
      )}
      {isUSDT && balanceUSDT <= 0 && (
        <a href={GUIDE_LINKS.payment[lang]} target="_blank" rel="noreferrer">
          <TextIcon size="xs" textDecoration="underline" color="greyDark">
            <Translate
              zh_hant="如何移轉資金到 Polygon？"
              zh_hans="如何移转资金到 Polygon？"
              en="How to transfer funds to Polygon?"
            />
          </TextIcon>
        </a>
      )}
    </section>
  )
}

export default SetAmountBalance
