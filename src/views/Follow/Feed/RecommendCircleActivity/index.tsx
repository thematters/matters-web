import { Slides } from '~/components'

import FollowingRecommendCircle from '../FollowingRecommendCircle'
import FollowingRecommendHead from '../FollowingRecommendHead'
import { fragments } from './gql'

import { RecommendCircleActivity_recommendCircles } from './__generated__/RecommendCircleActivity'

interface Props {
  circles: RecommendCircleActivity_recommendCircles[] | null
}

const RecommendCircleActivity = ({ circles }: Props) => {
  if (!circles || circles.length <= 0) {
    return null
  }

  return (
    <Slides
      bgColor="grey-lighter"
      header={<FollowingRecommendHead type="circle" />}
    >
      {circles.map((circle, index) => (
        <Slides.Item size="md" key={index}>
          <section>
            <FollowingRecommendCircle circle={circle} />
          </section>
        </Slides.Item>
      ))}
    </Slides>
  )
}

RecommendCircleActivity.fragments = fragments

export default RecommendCircleActivity
