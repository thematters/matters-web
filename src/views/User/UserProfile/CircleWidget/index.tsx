import classNames from 'classnames'

import { useFeatures } from '~/components'
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
  hasDescription?: boolean
  hasFooter?: boolean
}

const CircleWidget: React.FC<CircleWidgetProps> = ({
  circles,
  isMe,
  hasDescription = true,
  hasFooter = true,
}) => {
  const features = useFeatures()
  const hasCircle = circles && circles.length > 0

  const circleWidgetClasses = classNames({
    [styles.circleWidget]: true,
    [styles.inAside]: hasDescription && hasFooter,
  })

  if (!isMe && !hasCircle) {
    return null
  }

  if (isMe && !hasCircle) {
    if (!features.circle_management) {
      return null
    }

    return null

    // return (
    //   <section className={circleWidgetClasses}>
    //     <TableView spacingX={0}>
    //       <TableView.Cell
    //         bold
    //         title={
    //           <FormattedMessage
    //             defaultMessage="Come build a Circle and call on your supporters to join you!"
    //             description="src/components/UserProfile/CircleWidget/index.tsx"
    //           />
    //         }
    //         href={PATHS.CIRCLE_CREATION}
    //         onClick={() => {
    //           analytics.trackEvent('click_button', { type: 'create_circle' })
    //         }}
    //         role="button"
    //         bgColor="greyLighter"
    //         bgActiveColor="greyLighter"
    //         spacing={[0, 16]}
    //         borderRadius="xtight"
    //       />
    //     </TableView>
    //   </section>
    // )
  }

  const circle = circles[0]

  return (
    <section className={circleWidgetClasses}>
      <CircleDigest.UserProfile
        circle={circle}
        hasDescription={hasDescription}
        hasFooter={hasFooter}
      />
    </section>
  )
}

export default CircleWidget
