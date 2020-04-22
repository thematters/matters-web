import { CurrencyAmount, CurrencyAmountProps, Dialog } from '~/components'

import styles from './styles.css'

type CompleteProps = CurrencyAmountProps

const Complete: React.FC<CompleteProps> = ({ amount, currency }) => {
  return (
    <>
      <Dialog.Message headline="successTopUp" />

      <section className="complete-content">
        <CurrencyAmount amount={amount} currency={currency} />
      </section>

      <style jsx>{styles}</style>
    </>
  )
}

export default Complete
