import { TEST_ID } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import { TextIcon } from '~/components'
import {
  DigestTransactionFragment,
  TransactionPurpose,
  TransactionState,
} from '~/gql/graphql'

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
  tx: DigestTransactionFragment
  testId?: TEST_ID
}

const Amount = ({
  tx: { amount, purpose, currency, state },
  testId,
}: AmountProps) => {
  const color =
    purpose === TransactionPurpose.Dispute && state === TransactionState.Pending
      ? 'black'
      : state !== TransactionState.Succeeded
        ? 'grey'
        : amount > 0
          ? 'gold'
          : 'black'

  return (
    <TextIcon spacing={8} size={16} weight="medium" color={color}>
      <span
        className={styles.amount}
        {...(testId ? { ['data-test-id']: testId } : {})}
      >
        {amount > 0 ? '+' : '-'}
        &nbsp;
        {currency}
        &nbsp;
        {formatAmount(Math.abs(amount))}
      </span>
    </TextIcon>
  )
}

export default Amount
