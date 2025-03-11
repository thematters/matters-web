import { useContext } from 'react'

import { analytics } from '~/common/utils'
import { Media, Slides, ViewerContext } from '~/components'
import { RecommendUserActivityFragment } from '~/gql/graphql'

import FollowingRecommendHead from '../FollowingRecommendHead'
import FollowingRecommendUser from '../FollowingRecommendUser'
import { fragments } from './gql'
import styles from './styles.module.css'

interface Props {
  users: RecommendUserActivityFragment['recommendUsers'] | null
}

const RecommendUserActivity = ({ users }: Props) => {
  const viewer = useContext(ViewerContext)
  users = users?.filter((u) => u.id !== viewer.id)

  if (!users || users.length <= 0) {
    return null
  }

  const renderSlideItem = (
    user: NonNullable<RecommendUserActivityFragment['recommendUsers']>[number],
    index: number,
    size: 'xxs' | 'md'
  ) => (
    <Slides.Item
      size={size}
      key={index}
      onClick={() => {
        analytics.trackEvent('click_feed', {
          type: 'following',
          contentType: 'UserRecommendationActivity',
          location: `${location}.${index}`,
          id: user.id,
        })
      }}
    >
      <section className={styles.item}>
        <FollowingRecommendUser user={user} />
      </section>
    </Slides.Item>
  )

  return (
    <section className={styles.container}>
      <Media lessThan="md">
        <Slides header={<FollowingRecommendHead type="user" />}>
          {users.map((user, index) => renderSlideItem(user, index, 'xxs'))}
        </Slides>
      </Media>
      <Media greaterThanOrEqual="md">
        <Slides header={<FollowingRecommendHead type="user" />}>
          {users.map((user, index) => renderSlideItem(user, index, 'md'))}
        </Slides>
      </Media>
    </section>
  )
}

RecommendUserActivity.fragments = fragments

export default RecommendUserActivity
