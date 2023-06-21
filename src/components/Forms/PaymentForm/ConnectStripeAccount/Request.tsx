import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { ADD_TOAST, PAYOUT_COUNTRY } from '~/common/enums'
import { parseFormSubmitErrors, sleep } from '~/common/utils'
import {
  Dialog,
  LanguageContext,
  Spacer,
  Translate,
  useMutation,
} from '~/components'
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
  const { lang } = useContext(LanguageContext)
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
      const [messages, codes] = parseFormSubmitErrors(error as any, lang)
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: messages[codes[0]],
          },
        })
      )
    }
  }

  return (
    <>
      <Dialog.Header
        title="connectStripeAccount"
        closeDialog={closeDialog}
        leftBtn={<Dialog.TextButton text="back" onClick={back} />}
      />

      <Dialog.Content>
        <SelectCountry country={country} onChange={setCountry} />
        <Spacer size="xxloose" />
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            {back && (
              <Dialog.TextButton
                text="back"
                color="greyDarker"
                onClick={back}
              />
            )}

            <Dialog.TextButton
              text={<Translate id="nextStep" />}
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
