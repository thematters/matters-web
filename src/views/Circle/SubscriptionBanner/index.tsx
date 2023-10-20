import { useContext } from 'react'

import {
  OPEN_SUBSCRIBE_CIRCLE_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  BindEmailHintDialog,
  Card,
  IconCircle16,
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

  if (isMember || isOwner) {
    return null
  }

  const openSubscribeCircleDialog = () =>
    window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_CIRCLE_DIALOG, {}))

  return (
    <BindEmailHintDialog>
      {({ openDialog: openBindEmailHintDialog }) => {
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
                  new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG)
                )
                return
              }

              if (!hasEmail) {
                openBindEmailHintDialog()
                return
              }

              openSubscribeCircleDialog()
            }}
          >
            <section className={styles.subscriptionBanner}>
              <TextIcon
                icon={<IconCircle16 size="mdS" />}
                size="xm"
                color="white"
                weight="md"
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
    </BindEmailHintDialog>
  )
}

SubscriptionBanner.fragments = fragments

export default SubscriptionBanner
