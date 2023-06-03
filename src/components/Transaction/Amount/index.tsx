import { TEST_ID } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import { TextIcon } from '~/components'
import { TransactionState } from '~/gql/graphql'

import styles from './styles.module.css'

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
  testId?: TEST_ID
}

const Amount = ({ amount, currency, state, testId }: AmountProps) => {
  const color =
    state !== TransactionState.Succeeded
      ? 'grey'
      : amount > 0
      ? 'gold'
      : 'black'

  return (
    <section
      className={styles.content}
      {...(testId ? { ['data-test-id']: testId } : {})}
    >
      <TextIcon spacing="xtight" size="mdS" weight="bold" color={color}>
        {amount > 0 ? '+' : '-'}
        &nbsp;
        {currency}
        &nbsp;
        {formatAmount(Math.abs(amount))}
      </TextIcon>
    </section>
  )
}

export default Amount
