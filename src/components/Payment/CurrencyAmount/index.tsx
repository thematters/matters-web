import { formatAmount } from '~/common/utils'

import styles from './styles.module.css'

export interface CurrencyAmountProps {
  currency: string
  amount: number
}

export const CurrencyAmount: React.FC<CurrencyAmountProps> = ({
  currency,
  amount,
}) => (
  <section className={styles.container}>
    <span className={styles.currency}>{currency}</span>
    <span className={styles.amount}>{formatAmount(amount)}</span>
  </section>
)
