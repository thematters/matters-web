import gql from 'graphql-tag'

import { Placeholder } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { useQuery } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import { HomeToday } from './__generated__/HomeToday'

export const HOME_TODAY = gql`
  query HomeToday(
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    viewer {
      id
      recommendation {
        today {
          ...TodayDigestArticle
        }
      }
    }
  }
  ${ArticleDigest.Feature.fragments.article}
`

export default () => {
  const { data, loading } = useQuery<HomeToday>(HOME_TODAY)

  if (loading || !data || !data.viewer) {
    return <Placeholder.MattersToday />
  }

  const article = data.viewer.recommendation.today

  if (!article) {
    return <Placeholder.MattersToday />
  }

  return (
    <>
      <ArticleDigest.Feature
        article={article}
        onClick={() =>
          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
            type: FEED_TYPE.TODAY
          })
        }
        hasAuthor
        hasDateTime
        hasBookmark
      />
    </>
  )
}
