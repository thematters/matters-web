import { Form, PaymentPointerDialog, Translate } from '~/components'

const PaymentPointer = () => (
  <PaymentPointerDialog>
    {({ open }) => (
      <Form.List.Item
        title={<Translate zh_hant="跨链收款地址" zh_hans="跨鏈收款地址" />}
        onClick={open}
      />
    )}
  </PaymentPointerDialog>
)

export default PaymentPointer
