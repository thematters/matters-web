import { analytics } from '~/common/utils'
import { Slides } from '~/components'
import { RecommendCircleActivityFragment } from '~/gql/graphql'

import FollowingRecommendCircle from '../FollowingRecommendCircle'
import FollowingRecommendHead from '../FollowingRecommendHead'
import { fragments } from './gql'
import styles from './styles.css'

interface Props {
  circles: RecommendCircleActivityFragment['recommendCircles'] | null
  location: number
}

const RecommendCircleActivity = ({ circles, location }: Props) => {
  if (!circles || circles.length <= 0) {
    return null
  }

  return (
    <Slides
      bgColor="grey-lighter"
      header={<FollowingRecommendHead type="circle" />}
    >
      {circles.map((circle, index) => (
        <Slides.Item
          size="md"
          key={index}
          onClick={() => {
            analytics.trackEvent('click_feed', {
              type: 'following',
              contentType: 'CircleRecommendationActivity',
              location: `${location}.${index}`,
              id: circle.id,
            })
          }}
        >
          <section className="item">
            <FollowingRecommendCircle circle={circle} />
          </section>
        </Slides.Item>
      ))}
      <style jsx>{styles}</style>
    </Slides>
  )
}

RecommendCircleActivity.fragments = fragments

export default RecommendCircleActivity
