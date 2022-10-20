import {
  IconFiatCurrency40,
  IconLikeCoin40,
  IconUSDTActive40,
} from '~/components/Icon'

import styles from './styles.css'

import { TransactionCurrency } from './../../../../__generated__/globalTypes'

interface Props {
  currency: TransactionCurrency
}

const Currency = ({ currency }: Props) => {
  const size = 'md'
  return (
    <section className="Currency">
      {currency === TransactionCurrency.USDT && (
        <IconUSDTActive40 size={size} />
      )}
      {currency === TransactionCurrency.HKD && (
        <IconFiatCurrency40 size={size} />
      )}
      {currency === TransactionCurrency.LIKE && <IconLikeCoin40 size={size} />}
      <style jsx>{styles}</style>
    </section>
  )
}

export default Currency
