import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog, Spinner, Translate } from '~/components'
import { ViewerStripeAccountQuery } from '~/gql/graphql'

interface Props {
  nextStep: () => void
  closeDialog: () => void
}

const VIEWER_STRIPE_ACCOUNT = gql`
  query ViewerStripeAccount {
    viewer {
      id
      wallet {
        stripeAccount {
          id
        }
      }
    }
  }
`

const Onboarding: React.FC<Props> = ({ nextStep }) => {
  const [polling, setPolling] = useState(true)
  const { data, error } = useQuery<ViewerStripeAccountQuery>(
    VIEWER_STRIPE_ACCOUNT,
    {
      pollInterval: polling ? 1000 : undefined,
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    }
  )
  const stripeAccount = data?.viewer?.wallet.stripeAccount?.id

  if (stripeAccount) {
    nextStep()
    return null
  }

  if (error) {
    setPolling(false)
  }

  return (
    <Dialog.Message type={error ? 'error' : undefined} spacing="md">
      {error ? (
        <h3>
          <Translate
            zh_hant="哎呀，創建失敗了。"
            zh_hans="哎呀，创建失败了。"
            en="Oops, failed to create account."
          />
        </h3>
      ) : (
        <>
          <Spinner />

          <p>
            <Translate
              zh_hant="請在新頁面完成 Stripe 帳戶創建，不要關閉本窗口"
              zh_hans="请在新页面完成 Stripe 帐户创建，不要关闭本窗口"
              en="Please create Stripe account on a new page. Do not close this page."
            />
          </p>
        </>
      )}
    </Dialog.Message>
  )
}

export default Onboarding
