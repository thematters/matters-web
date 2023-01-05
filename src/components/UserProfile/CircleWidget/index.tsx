import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Form,
  SubscribeCircleDialog,
  Translate,
  useFeatures,
} from '~/components'
import { CircleDigest } from '~/components/CircleDigest'
import {
  UserProfileUserPrivateQuery,
  UserProfileUserPublicQuery,
} from '~/gql/graphql'

import styles from './styles.css'

type CircleWidgetCircle = NonNullable<
  NonNullable<UserProfileUserPublicQuery['user']>['ownCircles']
>[0] &
  Partial<
    NonNullable<
      NonNullable<UserProfileUserPrivateQuery['user']>['ownCircles']
    >[0]
  >

type CircleWidgetProps = {
  circles: CircleWidgetCircle[]
  isMe: boolean
}

const CircleWidget: React.FC<CircleWidgetProps> = ({ circles, isMe }) => {
  const features = useFeatures()
  const hasCircle = circles && circles.length > 0

  if (!isMe && !hasCircle) {
    return null
  }

  if (isMe && !hasCircle) {
    if (!features.circle_management) {
      return null
    }

    return (
      <section className="circle-widget">
        <Form.List forceGreyStyle>
          <Form.List.Item
            forceGreyStyle
            bold
            title={
              <Translate
                zh_hant="快來搭建圍爐，呼召你的支持者加入"
                zh_hans="快来搭建围炉，呼召你的支持者加入"
              />
            }
            href={PATHS.CIRCLE_CREATION}
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'create_circle' })
            }}
            role="button"
          />
        </Form.List>

        <style jsx>{styles}</style>
      </section>
    )
  }

  const circle = circles[0]

  return (
    <section className="circle-widget">
      <CircleDigest.Rich
        avatarSize="xl"
        borderRadius="xtight"
        borderColor="line-grey-light"
        circle={circle}
        hasFooter
        hasOwner={false}
        hasPrice={!isMe}
        onClickPrice={() => {
          analytics.trackEvent('click_button', {
            type: 'subscribe_circle_price',
            pageType: 'user_profile',
          })
        }}
      />

      {!isMe && <SubscribeCircleDialog circle={circle} />}

      <style jsx>{styles}</style>
    </section>
  )
}

export default CircleWidget
