import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Translate
} from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { AllTopics } from './__generated__/AllTopics'

const ALL_TOPICSS = gql`
  query AllTopics(
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = true
  ) {
    viewer {
      id
      recommendation {
        topics(input: { first: 10, after: $cursor }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...FeedDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

const Topics = () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Head
        title={{
          zh_hant: TEXT.zh_hant.allTopics,
          zh_hans: TEXT.zh_hans.allTopics
        }}
      />

      <PageHeader
        pageTitle={
          <Translate
            zh_hant={TEXT.zh_hant.allTopics}
            zh_hans={TEXT.zh_hans.allTopics}
          />
        }
      />

      <section>
        <Query query={ALL_TOPICSS}>
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: AllTopics }) => {
            if (loading) {
              return <Placeholder.ArticleDigestList />
            }

            const connectionPath = 'viewer.recommendation.topics'
            const { edges, pageInfo } = _get(data, connectionPath, {})
            const loadMore = () => {
              analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
                type: FEED_TYPE.TOPICS,
                location: edges.length
              })
              return fetchMore({
                variables: {
                  cursor: pageInfo.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) =>
                  mergeConnections({
                    oldData: previousResult,
                    newData: fetchMoreResult,
                    path: connectionPath
                  })
              })
            }

            return (
              <InfiniteScroll
                hasNextPage={pageInfo.hasNextPage}
                loadMore={loadMore}
              >
                <ul>
                  {edges.map(
                    (
                      { node, cursor }: { node: any; cursor: any },
                      i: number
                    ) => (
                      <li
                        key={cursor}
                        onClick={() =>
                          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                            type: FEED_TYPE.ALL_TOPICS,
                            location: i
                          })
                        }
                      >
                        <ArticleDigest.Feed
                          article={node}
                          hasDateTime
                          hasBookmark
                          hasTopicScore
                        />
                      </li>
                    )
                  )}
                </ul>
              </InfiniteScroll>
            )
          }}
        </Query>
      </section>
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Footer />
    </aside>
  </main>
)

export default Topics
