import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { ArticleDigest, Error, Label, Translate } from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import ViewAllLink from '../ViewAllLink'
import { SidebarTopics } from './__generated__/SidebarTopics'
import styles from './styles.css'

const SIDEBAR_TOPICS = gql`
  query SidebarTopics(
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = false
    $hasArticleDigestCover: Boolean = false
    $hasArticleDigestActionTopicScore: Boolean = true
  ) {
    viewer {
      id
      recommendation {
        topics(input: { first: 5 }) {
          edges {
            cursor
            node {
              ...SidebarDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Sidebar.fragments.article}
`

export default () => (
  <>
    <Query query={SIDEBAR_TOPICS}>
      {({ data, loading, error }: QueryResult & { data: SidebarTopics }) => {
        if (error) {
          return <Error error={error} />
        }

        const edges = _get(data, 'viewer.recommendation.topics.edges', [])

        if (!edges || edges.length <= 0) {
          return null
        }

        return (
          <>
            <header>
              <Label>
                <Translate zh_hant="熱議話題" zh_hans="热议话题" />
              </Label>
              <ViewAllLink type="topics" />
            </header>

            <ol>
              {edges.map(
                ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                  <li
                    key={cursor}
                    onClick={() =>
                      analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                        type: FEED_TYPE.TOPICS,
                        location: i
                      })
                    }
                  >
                    <ArticleDigest.Sidebar article={node} hasTopicScore />
                  </li>
                )
              )}
            </ol>
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)
