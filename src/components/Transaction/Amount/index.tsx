import { TEST_ID } from '~/common/enums'
import { formatAmount } from '~/common/utils'
import { TextIcon, TextIconColor } from '~/components'
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
  const isVaultWithdrawal =
    purpose === TransactionPurpose.CurationVaultWithdrawal
  const showSymbol = !isVaultWithdrawal

  let color: TextIconColor = 'black'
  if (state === TransactionState.Failed) {
    color = 'red'
  } else if (
    (purpose === TransactionPurpose.Dispute &&
      state === TransactionState.Pending) ||
    isVaultWithdrawal
  ) {
    color = 'black'
  } else if (state !== TransactionState.Succeeded) color = 'grey'
  else if (amount > 0) {
    color = 'gold'
  }

  return (
    <TextIcon spacing={8} size={16} weight="medium" color={color}>
      <span
        className={styles.amount}
        {...(testId ? { ['data-test-id']: testId } : {})}
      >
        {showSymbol && (amount > 0 ? '+' : '-')}
        &nbsp;
        {currency}
        &nbsp;
        {formatAmount(Math.abs(amount))}
      </span>
    </TextIcon>
  )
}

export default Amount
