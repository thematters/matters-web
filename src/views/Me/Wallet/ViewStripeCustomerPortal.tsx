import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Form, IconExternalLink16, TextIcon, Translate } from '~/components'

import { GetCustomerPortal } from './__generated__/GetCustomerPortal'

const GET_CUSTOMER_PORTAL = gql`
  query GetCustomerPortal {
    viewer {
      id
      wallet {
        customerPortal
      }
    }
  }
`

const ViewStripeCustomerPortal = () => {
  const { data } = useQuery<GetCustomerPortal>(GET_CUSTOMER_PORTAL)
  const url = data?.viewer?.wallet.customerPortal

  if (!url) {
    return null
  }

  return (
    <Form.List.Item
      title={
        <Translate
          zh_hant="變更圍爐訂閱信用卡"
          zh_hans="变更围炉订阅信用卡"
          en="Payment Method of Circle Subscription"
        />
      }
      htmlHref={url}
      htmlTarget="_blank"
      right={<TextIcon icon={<IconExternalLink16 color="grey" size="sm" />} />}
      ariaRole="link"
    />
  )
}

export default ViewStripeCustomerPortal
