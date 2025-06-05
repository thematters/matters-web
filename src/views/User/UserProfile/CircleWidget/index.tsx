import classNames from 'classnames'

import {
  UserProfileUserPrivateQuery,
  UserProfileUserPublicQuery,
} from '~/gql/graphql'

import CircleDigestUserProfile from './CircleDigestUserProfile'
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
  hasDescription?: boolean
  hasFooter?: boolean
}

const CircleWidget: React.FC<CircleWidgetProps> = ({
  circles,
  isMe,
  hasDescription = true,
  hasFooter = true,
}) => {
  const hasCircle = circles && circles.length > 0

  const circleWidgetClasses = classNames({
    [styles.circleWidget]: true,
    [styles.inAside]: hasDescription && hasFooter,
  })

  if (!isMe && !hasCircle) {
    return null
  }

  if (isMe && !hasCircle) {
    return null
  }

  const circle = circles[0]

  return (
    <section className={circleWidgetClasses}>
      <CircleDigestUserProfile
        circle={circle}
        hasDescription={hasDescription}
        hasFooter={hasFooter}
      />
    </section>
  )
}

export default CircleWidget
