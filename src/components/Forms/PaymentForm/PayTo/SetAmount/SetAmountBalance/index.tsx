import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

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
        <FormattedMessage defaultMessage="Select amount" id="Z6Z1aN" />
      </span>

      <span className={styles.right}>
        {!isBalanceInsufficient && (
          <>
            <FormattedMessage defaultMessage="Balance:&nbsp;" id="y2IqUi" />
          </>
        )}
        <span className={styles.balance}>
          {isUSDT && <span>USDT {formatAmount(balanceUSDT)}</span>}
          {isHKD && !isBalanceInsufficient && (
            <span>HKD {formatAmount(balanceHKD)}</span>
          )}
          {isLike && <span>LIKE {formatAmount(balanceLike, 0)}</span>}
          {isHKD && isBalanceInsufficient && (
            <FormattedMessage
              defaultMessage="Insufficient balance"
              id="kaPKOB"
            />
          )}
        </span>
        {isHKD && (
          <BindEmailHintDialog>
            {({ openDialog }) => {
              return (
                <section className={styles.topup}>
                  <Button onClick={hasEmail ? switchToAddCredit : openDialog}>
                    <TextIcon
                      size="sm"
                      textDecoration="underline"
                      color="gold"
                      weight="md"
                    >
                      <FormattedMessage defaultMessage="Top up" id="Y47aYU" />
                    </TextIcon>
                  </Button>
                </section>
              )
            }}
          </BindEmailHintDialog>
        )}
      </span>

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
