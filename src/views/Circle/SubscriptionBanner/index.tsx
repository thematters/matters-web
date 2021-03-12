import { useContext } from 'react'

import {
  Card,
  IconArrowRight16,
  Layout,
  LoginButton,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, OPEN_SUBSCRIBE_CIRCLE_DIALOG } from '~/common/enums'
import { analytics } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { SubscriptionBannerCirclePrivate } from './__generated__/SubscriptionBannerCirclePrivate'
import { SubscriptionBannerCirclePublic } from './__generated__/SubscriptionBannerCirclePublic'

type SubscriptionBannerProps = {
  circle: SubscriptionBannerCirclePublic &
    Partial<SubscriptionBannerCirclePrivate>
}

const SubscriptionBanner = ({ circle }: SubscriptionBannerProps) => {
  const viewer = useContext(ViewerContext)
  const isMember = circle.isMember
  const isOwner = circle?.owner?.id === viewer.id
  const price = circle.prices && circle.prices[0]

  if (isMember || isOwner || !price) {
    return null
  }

  const showLoginToast = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="請登入／註冊訂閱圍爐"
              zh_hans="请登入／注册订阅围炉"
            />
          ),
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  const openSubscribeCircleDialog = () =>
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))

  return (
    <section className="subscription-banner">
      <Layout.FixedMain>
        <Card
          bgColor="none"
          spacing={[0, 0]}
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'subscribe_circle_banner',
              pageType: 'circle_detail',
            })

            if (!viewer.isAuthed) {
              showLoginToast()
              return
            }

            openSubscribeCircleDialog()
          }}
        >
          <section className="content">
            <section className="inner">
              <p>
                {price.amount} {price.currency} / <Translate id="month" />
                <Translate zh_hant="，立即訂閱圍爐" zh_hans="，立即订阅围炉" />
              </p>

              <IconArrowRight16 color="white" />
            </section>
          </section>
        </Card>
      </Layout.FixedMain>

      <style jsx>{styles}</style>
    </section>
  )
}

SubscriptionBanner.fragments = fragments

export default SubscriptionBanner
