import { Slides } from '~/components'

import { analytics } from '~/common/utils'

import FollowingRecommendHead from '../FollowingRecommendHead'
import FollowingRecommendUser from '../FollowingRecommendUser'
import { fragments } from './gql'
import styles from './styles.css'

import { RecommendUserActivity_recommendUsers } from './__generated__/RecommendUserActivity'

interface Props {
  users: RecommendUserActivity_recommendUsers[] | null
}

const RecommendUserActivity = ({ users }: Props) => {
  if (!users || users.length <= 0) {
    return null
  }

  return (
    <Slides
      bgColor="grey-lighter"
      header={<FollowingRecommendHead type="user" />}
    >
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
          <section className="item">
            <FollowingRecommendUser user={user} />
          </section>
        </Slides.Item>
      ))}
      <style jsx>{styles}</style>
    </Slides>
  )
}

RecommendUserActivity.fragments = fragments

export default RecommendUserActivity
