import { CurrencyAmount, Translate } from '~/components'

import { PAYMENT_CURRENCY, PAYMENT_MINIMAL_PAYOUT_AMOUNT } from '~/common/enums'

import styles from './styles.css'

interface BalanceProps {
  balanceHKD: number
  canPayout: boolean
}

const Balance: React.FC<BalanceProps> = ({ balanceHKD, canPayout }) => {
  return (
    <section className="balance">
      <p className="hint">
        <Translate zh_hant="可用餘額" zh_hans="可用余额" />
      </p>

      <CurrencyAmount currency={PAYMENT_CURRENCY.HKD} amount={balanceHKD} />

      {!canPayout && (
        <p className="payout-hint">
          <span>
            <Translate
              zh_hant={`餘額超過 ${PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD} HKD 就可以提現啦！`}
              zh_hans={`余额超过 ${PAYMENT_MINIMAL_PAYOUT_AMOUNT.HKD} HKD 就可以提现啦！`}
            />
          </span>
        </p>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Balance
