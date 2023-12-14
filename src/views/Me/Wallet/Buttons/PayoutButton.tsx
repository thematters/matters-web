import { FormattedMessage } from 'react-intl'

import { ButtonProps, Dialog, PayoutDialog } from '~/components'

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
          text={<FormattedMessage defaultMessage="Withdraw" id="PXAur5" />}
          color="greyDarker"
          aria-haspopup="dialog"
          onClick={openPayoutDialog}
        />
      )}
    </PayoutDialog>
  )
}

export default PayoutButton
