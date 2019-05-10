import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import { ArticleDigest, Label, Translate } from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
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
        const edges = _get(data, 'viewer.recommendation.topics.edges', [])

        if (!edges || edges.length <= 0) {
          return null
        }

        return (
          <>
            <header>
              <Label>
                <Translate
                  zh_hant={TEXT.zh_hant.hotTopics}
                  zh_hans={TEXT.zh_hans.hotTopics}
                />
              </Label>
              <ViewAllLink type="topics" />
            </header>

            <ol>
              {edges
                .filter(({ node }: { node: any }) => !!node.mediaHash)
                .map(
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
