import { Form, PaymentPointerDialog, Translate } from '~/components'

const PaymentPointer = () => (
  <PaymentPointerDialog>
    {({ openDialog }) => (
      <Form.List.Item
        title={<Translate id="paymentPointer" />}
        onClick={openDialog}
        role="button"
        ariaHasPopup="dialog"
      />
    )}
  </PaymentPointerDialog>
)

export default PaymentPointer
