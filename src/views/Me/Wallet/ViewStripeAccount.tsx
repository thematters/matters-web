import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import { Form, Icon, TextIcon, Translate } from '~/components'

import { GetStripeLoginUrl } from './__generated__/GetStripeLoginUrl'

const GET_STRIPE_LOGIN_URL = gql`
  query GetStripeLoginUrl {
    viewer {
      id
      wallet {
        stripeAccount {
          id
          loginUrl
        }
      }
    }
  }
`

const Buttons = () => {
  const [loading, setLoading] = useState(false)

  /**
   * Use `useApolloClient` instead of `useLazyQuery`
   * since `useLazyQuery` return Promsise<void>, and
   * `window.open` is only triggered by user action.
   *
   */
  const client = useApolloClient()
  const openStripeDashboard = async () => {
    setLoading(true)

    try {
      const { data } = await client.query<GetStripeLoginUrl>({
        query: GET_STRIPE_LOGIN_URL,
      })
      const loginUrl = data?.viewer?.wallet.stripeAccount?.loginUrl

      window.open(loginUrl, '_blank')
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }

  return (
    <Form.List.Item
      title={
        <Translate zh_hant="管理 Stripe 賬戶" zh_hans="管理 Stripe 账户" />
      }
      onClick={openStripeDashboard}
      right={
        loading ? (
          <Icon.Spinner color="grey" size="sm" />
        ) : (
          <TextIcon icon={<Icon.ExternalLink color="grey" size="sm" />} />
        )
      }
    />
  )
}

export default Buttons
