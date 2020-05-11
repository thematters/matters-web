import { useQuery } from '@apollo/react-hooks'

import { CurrencyAmount, Spinner, Translate } from '~/components'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_CURRENCY } from '~/common/enums'

import styles from './styles.css'

import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

const Balance = () => {
  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE)

  if (loading) {
    return <Spinner />
  }

  const balanceHKD = data?.viewer?.wallet.balance.HKD || 0

  return (
    <section className="balance">
      <p className="hint">
        <Translate zh_hant="可用餘額" zh_hans="可用余额" />
      </p>

      <CurrencyAmount currency={PAYMENT_CURRENCY.HKD} amount={balanceHKD} />

      <style jsx>{styles}</style>
    </section>
  )
}

export default Balance
