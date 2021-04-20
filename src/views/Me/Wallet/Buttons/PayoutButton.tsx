import { gql } from '@apollo/client'

import {
  ButtonProps,
  Dialog,
  IconSpinner16,
  PayoutDialog,
  Translate,
  useMutation,
} from '~/components'

import { sleep } from '~/common/utils'

import { ConnectStripeAccount } from './__generated__/ConnectStripeAccount'

type PayoutButtonProps = {
  hasStripeAccount: boolean
} & ButtonProps

const CONNECT_STRIPE_ACCOUNT = gql`
  mutation ConnectStripeAccount {
    connectStripeAccount {
      redirectUrl
    }
  }
`

const PayoutButton: React.FC<PayoutButtonProps> = ({
  hasStripeAccount,
  ...buttonProps
}) => {
  const [connectStripeAccount, { loading }] = useMutation<ConnectStripeAccount>(
    CONNECT_STRIPE_ACCOUNT
  )

  return (
    <PayoutDialog hasStripeAccount={hasStripeAccount}>
      {({ open }) => (
        <Dialog.Footer.Button
          {...buttonProps}
          bgColor="grey-lighter"
          textColor="black"
          aria-haspopup="true"
          onClick={async () => {
            if (hasStripeAccount) {
              open()
            } else {
              const { data } = await connectStripeAccount()
              const redirectUrl = data?.connectStripeAccount.redirectUrl
              open()
              await sleep(2000)
              window.open(redirectUrl, '_blank')
            }
          }}
        >
          {loading ? (
            <IconSpinner16 color="grey-light" size="md" />
          ) : (
            <Translate id="paymentPayout" />
          )}
        </Dialog.Footer.Button>
      )}
    </PayoutDialog>
  )
}

export default PayoutButton
