import { FormattedMessage } from 'react-intl'

import { PaymentPointerDialog, TableView } from '~/components'

const PaymentPointer = () => (
  <PaymentPointerDialog>
    {({ openDialog }) => (
      <TableView.Cell
        title={
          <FormattedMessage defaultMessage="Payment Pointer" id="LklXfd" />
        }
        onClick={openDialog}
        role="button"
        ariaHasPopup="dialog"
      />
    )}
  </PaymentPointerDialog>
)

export default PaymentPointer
