import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import { Error, Placeholder } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { QueryError } from '~/components/GQL'

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

const MattersToday = () => {
  const { data, loading, error } = useQuery<HomeToday>(HOME_TODAY)

  if (loading) {
    return <Placeholder.MattersToday />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const article = data && data.viewer && data.viewer.recommendation.today

  if (!article) {
    return <Error type="not_found" />
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

export default MattersToday
