import { useContext } from 'react'

import IconCircle from '@/public/static/icons/24px/circle.svg'
import {
  OPEN_SUBSCRIBE_CIRCLE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Card,
  Icon,
  SetEmailDialog,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import {
  InvitationState,
  SubscriptionBannerCirclePrivateFragment,
  SubscriptionBannerCirclePublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type SubscriptionBannerProps = {
  circle: SubscriptionBannerCirclePublicFragment &
    Partial<SubscriptionBannerCirclePrivateFragment>
}

const SubscriptionBanner = ({ circle }: SubscriptionBannerProps) => {
  const viewer = useContext(ViewerContext)
  const isMember = circle.isMember
  const isOwner = circle?.owner?.id === viewer.id
  const isInvited = circle?.invitedBy?.state === InvitationState.Pending
  const hasEmail = !!viewer.info.email
  const isEmailVerified = !!viewer.info.emailVerified

  if (isMember || isOwner) {
    return null
  }

  const openSubscribeCircleDialog = () =>
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))

  return (
    <SetEmailDialog>
      {({ openDialog: openSetEmailDialog }) => {
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
                window.dispatchEvent(
                  new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                    detail: {
                      trigger: UNIVERSAL_AUTH_TRIGGER.circleSubscription,
                    },
                  })
                )
                return
              }

              if (!hasEmail || !isEmailVerified) {
                openSetEmailDialog()
                return
              }

              openSubscribeCircleDialog()
            }}
          >
            <section className={styles.subscriptionBanner}>
              <TextIcon
                icon={<Icon icon={IconCircle} size={20} />}
                size={18}
                color="white"
                weight="medium"
              >
                {isInvited ? (
                  <Translate
                    zh_hant="免費體驗"
                    zh_hans="免费体验"
                    en="Free Trial"
                  />
                ) : (
                  <Translate
                    zh_hant="訂閱圍爐"
                    zh_hans="订阅围炉"
                    en="Subscribe"
                  />
                )}
              </TextIcon>
            </section>
          </Card>
        )
      }}
    </SetEmailDialog>
  )
}

SubscriptionBanner.fragments = fragments

export default SubscriptionBanner
