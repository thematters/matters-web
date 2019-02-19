import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Empty,
  Footer,
  Icon,
  InfiniteScroll,
  PageHeader,
  Spinner
} from '~/components'

import { mergeConnections } from '~/common/utils'
import ICON_HASHTAG from '~/static/icons/hashtag.svg?sprite'
import { TagDetailArticles } from './__generated__/TagDetailArticles'

const TAG_DETAIL = gql`
  query TagDetailArticles($id: ID!, $cursor: String) {
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

const EmptyTagDetail = ({ description }: { description: string }) => (
  <Empty
    icon={
      <Icon id={ICON_HASHTAG.id} viewBox={ICON_HASHTAG.viewBox} size="xlarge" />
    }
    description={description}
  />
)

const TagDetail: React.FC<WithRouterProps> = ({ router }) => {
  if (!router || !router.query || !router.query.id) {
    return <EmptyTagDetail description="標籤不存在" />
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
              return <Spinner />
            }

            if (error) {
              return <span>{JSON.stringify(error)}</span> // TODO
            }

            const connectionPath = 'node.articles'
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
              <>
                <PageHeader pageTitle={data.node.content} />

                <section>
                  <InfiniteScroll
                    hasNextPage={pageInfo.hasNextPage}
                    loadMore={loadMore}
                    loading={loading}
                    loader={<Spinner />}
                  >
                    <ul>
                      {edges.map(
                        ({ node, cursor }: { node: any; cursor: any }) => (
                          <li key={cursor}>
                            <ArticleDigest.Feed article={node} />
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
