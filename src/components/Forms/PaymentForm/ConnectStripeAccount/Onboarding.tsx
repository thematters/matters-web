import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'

import { Dialog, SpinnerBlock, Translate } from '~/components'
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
  const { data, error, startPolling, stopPolling } =
    useQuery<ViewerStripeAccountQuery>(VIEWER_STRIPE_ACCOUNT, {
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    })
  const stripeAccount = data?.viewer?.wallet.stripeAccount?.id

  useEffect(() => {
    if (polling) {
      startPolling(1000)
    }

    return () => {
      stopPolling()
    }
  }, [polling])

  if (stripeAccount) {
    nextStep()
    return null
  }

  if (error) {
    setPolling(false)
  }

  return (
    <Dialog.Content>
      <Dialog.Content.Message
        align="center"
        smUpAlign="center"
        type={error ? 'error' : undefined}
      >
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
            <SpinnerBlock />

            <p>
              <Translate
                zh_hant="請在新頁面完成 Stripe 帳戶創建，不要關閉本窗口"
                zh_hans="请在新页面完成 Stripe 帐户创建，不要关闭本窗口"
                en="Please create Stripe account on a new page. Do not close this page."
              />
            </p>
          </>
        )}
      </Dialog.Content.Message>
    </Dialog.Content>
  )
}

export default Onboarding
