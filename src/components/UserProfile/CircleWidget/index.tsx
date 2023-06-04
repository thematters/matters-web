import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Form, SubscribeCircleDialog, useFeatures } from '~/components'
import { CircleDigest } from '~/components/CircleDigest'
import {
  UserProfileUserPrivateQuery,
  UserProfileUserPublicQuery,
} from '~/gql/graphql'

import styles from './styles.module.css'

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
      <section className={styles.circleWidget}>
        <Form.List spacingX={0}>
          <Form.List.Item
            bold
            title={
              <FormattedMessage
                defaultMessage="Come build a Circle and call on your supporters to join you!"
                description="src/components/UserProfile/CircleWidget/index.tsx"
              />
            }
            href={PATHS.CIRCLE_CREATION}
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'create_circle' })
            }}
            role="button"
            bgColor="greyLighter"
            bgActiveColor="greyLighter"
            spacing={[0, 'base']}
            borderRadius="xtight"
          />
        </Form.List>
      </section>
    )
  }

  const circle = circles[0]

  return (
    <section className={styles.circleWidget}>
      <CircleDigest.Rich
        avatarSize="xl"
        borderRadius="xtight"
        borderColor="lineGreyLight"
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
    </section>
  )
}

export default CircleWidget
