import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Footer,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Translate
} from '~/components'

import { mergeConnections } from '~/common/utils'
import { AllTopics } from './__generated__/AllTopics'

const ALL_TOPICS = gql`
  query AllTopics($cursor: String) {
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
      <PageHeader
        pageTitle={
          <Translate
            translations={{ zh_hant: '全部話題', zh_hans: '全部话题' }}
          />
        }
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
              return <Spinner />
            }

            if (error) {
              return <span>{JSON.stringify(error)}</span> // TODO
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
                      <ArticleDigest.Feed article={node} />
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
