import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import { ReactComponent as IconExternal } from '@/public/static/icons/24px/external.svg'
import { Icon, Spinner, TableView, TextIcon, Translate } from '~/components'
import { GetStripeLoginUrlQuery } from '~/gql/graphql'

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

const ViewStripeAccount = () => {
  const { data, loading } =
    useQuery<GetStripeLoginUrlQuery>(GET_STRIPE_LOGIN_URL)
  const loginUrl = data?.viewer?.wallet.stripeAccount?.loginUrl

  return (
    <TableView.Cell
      title={
        <Translate
          zh_hant="管理 Stripe 賬戶"
          zh_hans="管理 Stripe 账户"
          en="Manage Stripe account"
        />
      }
      htmlHref={loginUrl}
      htmlTarget="_blank"
      right={
        loading ? (
          <Spinner size={14} color="grey" />
        ) : (
          <TextIcon icon={<Icon icon={IconExternal} color="greyDarker" />} />
        )
      }
      role="link"
    />
  )
}

export default ViewStripeAccount
