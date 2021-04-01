import { useContext } from 'react'

import {
  Card,
  IconCircle16,
  LoginButton,
  TextIcon,
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
  const isInvited = circle?.invitedBy?.accepted === false

  if (isMember || isOwner) {
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
      <section className="subscription-banner">
        <TextIcon
          icon={<IconCircle16 size="md-s" />}
          size="xm"
          color="white"
          weight="md"
        >
          {isInvited ? (
            <Translate zh_hant="免費體驗" zh_hans="免费体验" en="Free Trial" />
          ) : (
            <Translate zh_hant="訂閱圍爐" zh_hans="订阅围炉" en="Subscribe" />
          )}
        </TextIcon>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

SubscriptionBanner.fragments = fragments

export default SubscriptionBanner
