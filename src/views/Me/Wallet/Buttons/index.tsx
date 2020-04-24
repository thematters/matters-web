import { AddCreditDialog, Dialog, Translate } from '~/components'

import styles from './styles.css'

const Buttons = () => {
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

          {/* <Dialog.Footer.Button bgColor="grey-lighter" textColor="black">
            <Translate id="paymentPassword" />
          </Dialog.Footer.Button> */}
        </section>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Buttons
