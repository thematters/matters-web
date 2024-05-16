import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import {
  BindEmailHintDialog,
  Button,
  LanguageContext,
  TextIcon,
  ViewerContext,
} from '~/components'

import styles from './styles.module.css'

type BalanceProps = {
  currency: CURRENCY
  amount: number
  isBalanceInsufficient?: boolean
  showTopUp?: boolean
  switchToAddCredit?: () => void
}

export const Balance: React.FC<BalanceProps> = ({
  currency,
  amount,
  isBalanceInsufficient,
  showTopUp = true,
  switchToAddCredit,
}) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  const isUSDT = currency === CURRENCY.USDT
  const isHKD = currency === CURRENCY.HKD
  const isLike = currency === CURRENCY.LIKE

  return (
    <span className={styles.container}>
      {isHKD && !isBalanceInsufficient && (
        <>
          <FormattedMessage
            defaultMessage="Balance:"
            description="src/components/Balance/index.tsx"
            id="1U/MPD"
          />
          {lang === 'en' && <>&nbsp;</>}
        </>
      )}
      <span className={styles.balance}>
        {isHKD && !isBalanceInsufficient && (
          <span>HKD {formatAmount(amount)}</span>
        )}
        {isHKD && isBalanceInsufficient && (
          <FormattedMessage
            defaultMessage="Insufficient balance"
            description="src/components/Balance/index.tsx"
            id="P2tEEn"
          />
        )}
        {isUSDT && <span>USDT {formatAmount(amount)}</span>}
        {isLike && <span>LIKE {formatAmount(amount, 0)}</span>}
      </span>
      {isHKD && showTopUp && (
        <BindEmailHintDialog>
          {({ openDialog }) => {
            return (
              <section className={styles.topup}>
                <Button onClick={hasEmail ? switchToAddCredit : openDialog}>
                  <TextIcon
                    size={14}
                    decoration="underline"
                    color="gold"
                    weight="medium"
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
  )
}
