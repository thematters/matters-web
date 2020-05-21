import gql from 'graphql-tag'

import {
  ButtonProps,
  Dialog,
  Icon,
  PayoutDialog,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'
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
              try {
                const { data } = await connectStripeAccount()
                const redirectUrl = data?.connectStripeAccount.redirectUrl
                open()
                await sleep(2000)
                window.open(redirectUrl, '_blank')
              } catch (e) {
                window.dispatchEvent(
                  new CustomEvent(ADD_TOAST, {
                    detail: {
                      color: 'red',
                      content: <Translate id="ACTION_FAILED" />,
                    },
                  })
                )
              }
            }
          }}
        >
          {loading ? (
            <Icon.Spinner color="grey-light" size="md" />
          ) : (
            <Translate id="paymentPayout" />
          )}
        </Dialog.Footer.Button>
      )}
    </PayoutDialog>
  )
}

export default PayoutButton
