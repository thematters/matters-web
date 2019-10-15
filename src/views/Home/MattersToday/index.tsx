import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import { Placeholder } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import { HomeToday } from './__generated__/HomeToday'
import styles from './styles.css'

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

export default () => (
  <>
    <Query query={HOME_TODAY}>
      {({ data, loading, error }: QueryResult & { data: HomeToday }) => {
        const article = _get(data, 'viewer.recommendation.today')

        if (loading || !article) {
          return <Placeholder.MattersToday />
        }

        return (
          <>
            <ArticleDigest.Feature
              article={data.viewer.recommendation.today}
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
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)
