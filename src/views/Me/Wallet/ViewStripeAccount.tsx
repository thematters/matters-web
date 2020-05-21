import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Form, Icon, TextIcon, Translate } from '~/components'

import { ADD_TOAST } from '~/common/enums'

import { GetStripeLoginUrl } from './__generated__/GetStripeLoginUrl'

const GET_STRIPE_LOGIN_URL = gql`
  query GetStripeLoginUrl {
    viewer {
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
  const [getStripeLoginUrl, { loading }] = useLazyQuery<GetStripeLoginUrl>(
    GET_STRIPE_LOGIN_URL
  )

  const getLoginUrl = async () => {
    try {
      await getStripeLoginUrl()

      // TODO
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

  return (
    <Form.List.Item
      title={
        <Translate zh_hant="管理 Stripe 賬戶" zh_hans="管理 Stripe 账户" />
      }
      onClick={getLoginUrl}
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
