import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Error,
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Placeholder,
  Spinner,
  Translate
} from '~/components'

import { mergeConnections } from '~/common/utils'

import { AllTopics } from './__generated__/AllTopics'

const ALL_TOPICS = gql`
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
      <Head title={{ zh_hant: '全部話題', zh_hans: '全部话题' }} />

      <PageHeader
        pageTitle={<Translate zh_hant="全部話題" zh_hans="全部话题" />}
      />

      <section>
        <Query query={ALL_TOPICS}>
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: AllTopics }) => {
            if (loading) {
              return <Placeholder.ArticleDigestList />
            }

            if (error) {
              return <Error error={error} />
            }

            const connectionPath = 'viewer.recommendation.topics'
            const { edges, pageInfo } = _get(data, connectionPath)
            const loadMore = () =>
              fetchMore({
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

            return (
              <InfiniteScroll
                hasNextPage={pageInfo.hasNextPage}
                loadMore={loadMore}
                loading={loading}
                loader={<Spinner />}
              >
                <ul>
                  {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <ArticleDigest.Feed
                        article={node}
                        hasDateTime
                        hasBookmark
                        hasTopicScore
                      />
                    </li>
                  ))}
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
