import { PAYMENT_CURRENCY } from '~/common/enums'

interface FormProps {
  amount: number
  currency: PAYMENT_CURRENCY
  submitCallback: () => void
}

const Confirm: React.FC<FormProps> = ({ submitCallback }) => {
  return <></>
}

export default Confirm
