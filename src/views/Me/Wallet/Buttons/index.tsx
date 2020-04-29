import { useContext } from 'react'

import { AddCreditDialog, Dialog, Translate, ViewerContext } from '~/components'

import PaymentPasswordButton from './PaymentPasswordButton'
import styles from './styles.css'

const Buttons = () => {
  const viewer = useContext(ViewerContext)
  const hasPaymentPassword = viewer.status?.hasPaymentPassword

  return (
    <section className="l-row">
      <div className="l-col-4 l-col-sm-4 l-offset-sm-2 l-col-md-5 l-offset-md-2 l-col-lg-6 l-offset-lg-3">
        <section className="buttons">
          <AddCreditDialog>
            {({ open }) => (
              <Dialog.Footer.Button bgColor="green" onClick={open}>
                <Translate id="topUp" />
              </Dialog.Footer.Button>
            )}
          </AddCreditDialog>

          {hasPaymentPassword && <PaymentPasswordButton />}
        </section>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Buttons
