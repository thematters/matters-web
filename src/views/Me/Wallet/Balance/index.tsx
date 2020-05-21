import { CurrencyAmount, Translate } from '~/components'

import { PAYMENT_CURRENCY } from '~/common/enums'

import styles from './styles.css'

interface BalanceProps {
  balanceHKD: number
}

const Balance: React.FC<BalanceProps> = ({ balanceHKD }) => {
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
