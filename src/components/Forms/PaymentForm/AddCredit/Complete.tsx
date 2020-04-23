import { CurrencyAmount, CurrencyAmountProps, Dialog } from '~/components'

import styles from './styles.css'

type CompleteProps = {
  footerButtons?: React.ReactNode
} & CurrencyAmountProps

const Complete: React.FC<CompleteProps> = ({
  amount,
  currency,
  footerButtons,
}) => {
  return (
    <>
      <Dialog.Content hasGrow>
        <section className="complete-content">
          <CurrencyAmount amount={amount} currency={currency} />
        </section>
      </Dialog.Content>

      {footerButtons && <Dialog.Footer>{footerButtons}</Dialog.Footer>}

      <style jsx>{styles}</style>
    </>
  )
}

export default Complete
