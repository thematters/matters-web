import { IcymiCuratedFeedRecommendationFragment } from '~/gql/graphql'

import { fragments } from './gql'

type IcymiCuratedFeed = {
  recommendation: IcymiCuratedFeedRecommendationFragment
}

export const IcymiCuratedFeed = ({ recommendation }: IcymiCuratedFeed) => {
  if (!recommendation.icymiTopic) {
    return null
  }

  // const { title, articles, pinAmount, note } = recommendation.icymiTopic

  return (
    <section>
      {/* note */}
      {/* article cards */}
      {/* article feed */}
    </section>
  )
}

IcymiCuratedFeed.fragments = fragments
