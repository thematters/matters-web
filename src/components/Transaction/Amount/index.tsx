import { TextIcon } from '~/components'

import { toAmountString } from '~/common/utils'

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
  state: string
}

const Amount = ({ amount, currency, state }: AmountProps) => {
  const color = state !== 'succeeded' ? 'grey' : amount > 0 ? 'gold' : 'black'

  return (
    <section>
      <TextIcon spacing="xtight" size="md-s" weight="semibold" color={color}>
        {amount > 0 ? '+' : '-'}
        &nbsp;
        {currency}
        &nbsp;
        {toAmountString(Math.abs(amount))}
      </TextIcon>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Amount
