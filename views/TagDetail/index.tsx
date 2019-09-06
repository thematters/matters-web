import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Placeholder
} from '~/components'
import EmptyTag from '~/components/Empty/EmptyTag'
import { Query } from '~/components/GQL'
import Throw404 from '~/components/Throw404'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { TagDetailArticles } from './__generated__/TagDetailArticles'

const TAG_DETAIL = gql`
  query TagDetailArticles(
    $id: ID!
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        content
        articles(input: { first: 10, after: $cursor }) {
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

const TagDetail: React.FC<WithRouterProps> = ({ router }) => {
  if (!router || !router.query || !router.query.id) {
    return <EmptyTag />
  }

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Query query={TAG_DETAIL} variables={{ id: router.query.id }}>
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: TagDetailArticles }) => {
            if (loading) {
              return <Placeholder.ArticleDigestList />
            }

            if (!data.node) {
              return <Throw404 />
            }

            const connectionPath = 'node.articles'
            const { edges, pageInfo } = _get(data, connectionPath, {})
            const loadMore = () => {
              analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
                type: FEED_TYPE.TAG_DETAIL,
                location: edges.length,
                entrance: data.node.id
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
              <>
                <Head title={`#${data.node.content}`} />

                <PageHeader pageTitle={data.node.content} />

                <section>
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
                              analytics.trackEvent(
                                ANALYTICS_EVENTS.CLICK_FEED,
                                {
                                  type: FEED_TYPE.TAG_DETAIL,
                                  location: i,
                                  entrance: data.node.id
                                }
                              )
                            }
                          >
                            <ArticleDigest.Feed
                              article={node}
                              hasDateTime
                              hasBookmark
                            />
                          </li>
                        )
                      )}
                    </ul>
                  </InfiniteScroll>
                </section>
              </>
            )
          }}
        </Query>
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>
    </main>
  )
}

export default withRouter(TagDetail)
