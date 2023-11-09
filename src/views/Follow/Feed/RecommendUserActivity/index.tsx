import { useContext } from 'react'

import { analytics } from '~/common/utils'
import { Slides, ViewerContext } from '~/components'
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

  return (
    <section className={styles.container}>
      <Slides header={<FollowingRecommendHead type="user" />}>
        {users.map((user, index) => (
          <Slides.Item
            size="md"
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
        ))}
      </Slides>
    </section>
  )
}

RecommendUserActivity.fragments = fragments

export default RecommendUserActivity
