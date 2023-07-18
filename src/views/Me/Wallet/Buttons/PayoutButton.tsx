import { ButtonProps, Dialog, PayoutDialog, Translate } from '~/components'

type PayoutButtonProps = {
  hasStripeAccount: boolean
} & ButtonProps

const PayoutButton: React.FC<PayoutButtonProps> = ({
  hasStripeAccount,
  ...buttonProps
}) => {
  return (
    <PayoutDialog hasStripeAccount={hasStripeAccount}>
      {({ openDialog: openPayoutDialog }) => (
        <Dialog.RoundedButton
          {...buttonProps}
          text={<Translate id="paymentPayout" />}
          color="greyDarker"
          aria-haspopup="dialog"
          onClick={openPayoutDialog}
        />
      )}
    </PayoutDialog>
  )
}

export default PayoutButton
