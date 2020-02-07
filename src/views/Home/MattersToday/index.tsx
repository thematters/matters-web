import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Error, Spinner } from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import ArticleFeatureDigest from './ArticleFeatureDigest'

import { HomeToday } from './__generated__/HomeToday'

export const HOME_TODAY = gql`
  query HomeToday {
    viewer {
      id
      recommendation {
        today {
          ...TodayDigestArticle
        }
      }
    }
  }
  ${ArticleFeatureDigest.fragments.article}
`

const MattersToday = () => {
  const { data, loading, error } = useQuery<HomeToday>(HOME_TODAY)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const article = data?.viewer?.recommendation.today

  if (!article) {
    return <Error type="not_found" />
  }

  return (
    <>
      <ArticleFeatureDigest
        article={article}
        onClick={() =>
          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
            type: FEED_TYPE.TODAY
          })
        }
      />
    </>
  )
}

export default MattersToday
