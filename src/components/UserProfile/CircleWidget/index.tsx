import { Form, Translate } from '~/components'
import { CircleDigest } from '~/components/CircleDigest'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

import { UserProfileUserPrivate_user_ownCircles } from '../__generated__/UserProfileUserPrivate'
import { UserProfileUserPublic_user_ownCircles } from '../__generated__/UserProfileUserPublic'

type CircleWidgetCircle = UserProfileUserPublic_user_ownCircles &
  Partial<UserProfileUserPrivate_user_ownCircles>

type CircleWidgetProps = {
  circles: CircleWidgetCircle[]
  isMe: boolean
}

const CircleWidget: React.FC<CircleWidgetProps> = ({ circles, isMe }) => {
  // TODO: viewer's circle
  // @ts-ignore
  // if (features.circle) {
  //   return null
  // }

  const hasCircle = circles && circles.length > 0

  if (!isMe && !hasCircle) {
    return null
  }

  if (isMe && !hasCircle) {
    return (
      <section className="circle-widget">
        <Form.List forceGreyStyle>
          <Form.List.Item
            forceGreyStyle
            title={
              <Translate
                zh_hant="快來搭建圍爐，呼召你的支持者加入"
                zh_hans="快来搭建围炉，呼召你的支持者加入"
              />
            }
            href={PATHS.CIRCLE_CREATION}
          />
        </Form.List>

        <style jsx>{styles}</style>
      </section>
    )
  }

  const circle = circles[0]

  return (
    <section className="circle-widget">
      <section className="border">
        <CircleDigest.Rich
          avatarSize="xl"
          borderRadius="xtight"
          circle={circle}
          hasFooter
          hasOwner={false}
          hasPrice={!isMe}
        />
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default CircleWidget
