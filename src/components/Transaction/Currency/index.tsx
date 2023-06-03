import {
  IconFiatCurrency40,
  IconLikeCoin40,
  IconUSDTActive40,
} from '~/components/Icon'
import { TransactionCurrency } from '~/gql/graphql'

import styles from './styles.module.css'

interface Props {
  currency: TransactionCurrency
}

const Currency = ({ currency }: Props) => {
  const size = 'md'
  return (
    <section className={styles['Currency']}>
      {currency === TransactionCurrency.Usdt && (
        <IconUSDTActive40 size={size} />
      )}
      {currency === TransactionCurrency.Hkd && (
        <IconFiatCurrency40 size={size} />
      )}
      {currency === TransactionCurrency.Like && <IconLikeCoin40 size={size} />}
    </section>
  )
}

export default Currency
