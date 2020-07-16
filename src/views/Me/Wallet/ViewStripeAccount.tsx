import { useQuery, gql } from '@apollo/client'

import {
  Form,
  IconExternalLink,
  IconSpinner,
  TextIcon,
  Translate,
} from '~/components'

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
  const { data, loading } = useQuery<GetStripeLoginUrl>(GET_STRIPE_LOGIN_URL)
  const loginUrl = data?.viewer?.wallet.stripeAccount?.loginUrl

  return (
    <Form.List.Item
      title={
        <Translate zh_hant="管理 Stripe 賬戶" zh_hans="管理 Stripe 账户" />
      }
      htmlHref={loginUrl}
      htmlTarget="_blank"
      right={
        loading ? (
          <IconSpinner color="grey" size="sm" />
        ) : (
          <TextIcon icon={<IconExternalLink color="grey" size="sm" />} />
        )
      }
    />
  )
}

export default Buttons
