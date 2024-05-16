import classNames from 'classnames'
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
  loading?: boolean
}

export const Balance: React.FC<BalanceProps> = ({
  currency,
  amount,
  isBalanceInsufficient,
  showTopUp = true,
  switchToAddCredit,
  loading,
}) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  const isUSDT = currency === CURRENCY.USDT
  const isHKD = currency === CURRENCY.HKD
  const isLike = currency === CURRENCY.LIKE

  if (loading) {
    return (
      <span className={styles.container}>
        <FormattedMessage defaultMessage="Balance loading..." id="E7vGxB" />
      </span>
    )
  }

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.insufficient]: isHKD && isBalanceInsufficient,
  })

  const formattedAmount = formatAmount(amount, isUSDT ? 2 : 0)

  return (
    <span className={containerClasses}>
      {!isBalanceInsufficient && (
        <>
          <FormattedMessage
            defaultMessage="Balance:"
            description="src/components/Balance/index.tsx"
            id="1U/MPD"
          />
          {lang === 'en' && <>&nbsp;</>}
        </>
      )}
      <span className={styles.balance} title={formattedAmount}>
        {isUSDT && <span>USDT {formattedAmount}</span>}
        {isHKD && isBalanceInsufficient && (
          <FormattedMessage
            defaultMessage="Insufficient: "
            description="src/components/Balance/index.tsx"
            id="hWq/ii"
          />
        )}
        {isHKD && <span>HKD {formattedAmount}</span>}
        {isLike && <span>LIKE {formattedAmount}</span>}
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
                    <FormattedMessage
                      defaultMessage="Top up"
                      id="hAyhzq"
                      description="SUPPORT_HKD"
                    />
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
