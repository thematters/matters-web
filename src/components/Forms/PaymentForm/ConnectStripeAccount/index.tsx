import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog, Spinner, Translate } from '~/components'

import { ViewerStripeAccount } from './__generated__/ViewerStripeAccount'

interface Props {
  nextStep: () => void
  windowRef?: Window
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

const ConnectStripeAccount: React.FC<Props> = ({ nextStep, windowRef }) => {
  const [polling, setPolling] = useState(true)
  const { data, error } = useQuery<ViewerStripeAccount>(VIEWER_STRIPE_ACCOUNT, {
    pollInterval: polling ? 1000 : undefined,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser,
  })
  const stripeAccount = data?.viewer?.wallet.stripeAccount?.id

  if (stripeAccount) {
    nextStep()

    if (windowRef) {
      windowRef.close()
    }

    return null
  }

  if (error) {
    setPolling(false)
  }

  return (
    <Dialog.Message error={!!error} spacing="md">
      {error ? (
        <h3>
          <Translate
            zh_hant="哎呀，創建失敗了。"
            zh_hans="哎呀，创建失败了。"
          />
        </h3>
      ) : (
        <>
          <Spinner />

          <p>
            <Translate
              zh_hant="請在新頁面完成 Stripe 帳戶創建，不要關閉本窗口"
              zh_hans="请在新页面完成 Stripe 帐户创建，不要关闭本窗口"
            />
          </p>
        </>
      )}
    </Dialog.Message>
  )
}

export default ConnectStripeAccount
