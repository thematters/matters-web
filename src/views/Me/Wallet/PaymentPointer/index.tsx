import { Form, PaymentPointerDialog, Translate } from '~/components'

const PaymentPointer = () => (
  <PaymentPointerDialog>
    {({ openDialog }) => (
      <Form.List.Item
        title={<Translate id="paymentPointer" />}
        onClick={openDialog}
      />
    )}
  </PaymentPointerDialog>
)

export default PaymentPointer
