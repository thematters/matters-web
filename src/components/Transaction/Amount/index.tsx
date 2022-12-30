import { formatAmount } from '~/common/utils'
import { TextIcon } from '~/components'
import { TransactionState } from '~/gql/graphql'

import styles from './styles.css'

/***
 * This is a sub component of Transaction that presents
 * the amount of it, and the color of text based on it's
 * transaction state.
 *
 * Usage:
 *
 * ```tsx
 *  <Amount
 *    amount={amount}
 *    currency={currency}
 *    state={state}
 *  />
 * ```
 */
interface AmountProps {
  amount: number
  currency: string
  state: TransactionState
}

const Amount = ({ amount, currency, state }: AmountProps) => {
  const color =
    state !== TransactionState.succeeded
      ? 'grey'
      : amount > 0
      ? 'gold'
      : 'black'

  return (
    <section>
      <TextIcon spacing="xtight" size="md-s" weight="semibold" color={color}>
        {amount > 0 ? '+' : '-'}
        &nbsp;
        {currency}
        &nbsp;
        {formatAmount(Math.abs(amount))}
      </TextIcon>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Amount
