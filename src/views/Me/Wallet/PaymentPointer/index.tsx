import { PaymentPointerDialog, TableView, Translate } from '~/components'

const PaymentPointer = () => (
  <PaymentPointerDialog>
    {({ openDialog }) => (
      <TableView.Cell
        title={<Translate id="paymentPointer" />}
        onClick={openDialog}
        role="button"
        ariaHasPopup="dialog"
      />
    )}
  </PaymentPointerDialog>
)

export default PaymentPointer
