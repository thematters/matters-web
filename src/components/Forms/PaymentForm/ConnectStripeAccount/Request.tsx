import { ApolloError } from '@apollo/client'
import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { PAYOUT_COUNTRY } from '~/common/enums'
import { parseFormSubmitErrors, sleep } from '~/common/utils'
import { Dialog, Spacer, toast, useMutation } from '~/components'
import { ConnectStripeAccountMutation } from '~/gql/graphql'

import SelectCountry from './SelectCountry'

interface Props {
  back?: () => void
  nextStep: () => void
  closeDialog: () => void
}

const CONNECT_STRIPE_ACCOUNT = gql`
  mutation ConnectStripeAccount($country: StripeAccountCountry!) {
    connectStripeAccount(input: { country: $country }) {
      redirectUrl
    }
  }
`

const Request: React.FC<Props> = ({ back, nextStep, closeDialog }) => {
  const intl = useIntl()
  const [country, setCountry] = useState<PAYOUT_COUNTRY>(
    PAYOUT_COUNTRY.HongKong
  )
  const [connectStripeAccount, { loading }] =
    useMutation<ConnectStripeAccountMutation>(CONNECT_STRIPE_ACCOUNT)

  const request = async () => {
    try {
      const { data } = await connectStripeAccount({ variables: { country } })
      const redirectUrl = data?.connectStripeAccount.redirectUrl
      await sleep(1000)
      window.open(redirectUrl, '_blank')
      nextStep()
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error as ApolloError)

      toast.error({ message: intl.formatMessage(messages[codes[0]]) })
    }
  }

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Create Stripe Account"
            id="lIPOh3"
          />
        }
        closeDialog={closeDialog}
        leftBtn={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
            onClick={back}
          />
        }
      />

      <Dialog.Content>
        <SelectCountry country={country} onChange={setCountry} />
        <Spacer size="sp40" />
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            {back && (
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
                color="greyDarker"
                onClick={back}
              />
            )}

            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
              onClick={request}
              disabled={loading}
              loading={loading}
            />
          </>
        }
      />
    </>
  )
}

export default Request
