import { Form, PaymentPointerDialog, Translate } from '~/components'

const PaymentPointer = () => (
  <PaymentPointerDialog>
    {({ open }) => (
      <Form.List.Item
        title={<Translate id="paymentPointer" />}
        onClick={open}
      />
    )}
  </PaymentPointerDialog>
)

export default PaymentPointer
