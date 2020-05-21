import { ButtonProps, Dialog, Translate } from '~/components'

const PayoutButton: React.FC<ButtonProps> = (props) => {
  return (
    <Dialog.Footer.Button
      {...props}
      bgColor="grey-lighter"
      textColor="black"
      aria-haspopup="true"
    >
      <Translate id="paymentPayout" />
    </Dialog.Footer.Button>
  )
}

export default PayoutButton
