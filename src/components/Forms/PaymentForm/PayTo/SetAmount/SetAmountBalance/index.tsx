import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { Balance } from '~/components'

import styles from './styles.module.css'

type SetAmountBalanceProps = {
  currency: CURRENCY
  balanceUSDT: number
  balanceHKD: number
  balanceLike: number
  isBalanceInsufficient: boolean
  switchToAddCredit: () => void
  loading?: boolean
}

const SetAmountBalance: React.FC<SetAmountBalanceProps> = ({
  currency,
  balanceUSDT,
  balanceHKD,
  balanceLike,
  isBalanceInsufficient,
  switchToAddCredit,
  loading,
}) => {
  const isUSDT = currency === CURRENCY.USDT
  const isHKD = currency === CURRENCY.HKD

  const amount = isUSDT ? balanceUSDT : isHKD ? balanceHKD : balanceLike

  return (
    <section className={styles.setAmountBalance}>
      <span className={styles.left}>
        <FormattedMessage
          defaultMessage="Select amount"
          description="src/components/Forms/PaymentForm/PayTo/SetAmount/SetAmountBalance/index.tsx"
          id="7VSfs3"
        />
      </span>

      <span className={styles.right}>
        <Balance
          currency={currency}
          amount={amount}
          isBalanceInsufficient={isBalanceInsufficient}
          switchToAddCredit={switchToAddCredit}
          loading={loading}
        />
      </span>
    </section>
  )
}

export default SetAmountBalance
