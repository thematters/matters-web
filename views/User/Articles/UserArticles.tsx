import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext } from 'react'
import { QueryResult } from 'react-apollo'

import { ArticleDigest, Head, InfiniteScroll, Placeholder } from '~/components'
import EmptyArticle from '~/components/Empty/EmptyArticle'
import { Query } from '~/components/GQL'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'
import ICON_192 from '~/static/icon-192x192.png?url'

import { UserArticleFeed } from './__generated__/UserArticleFeed'

const USER_ARTICLES_FEED = gql`
  query UserArticleFeed(
    $userName: String!
    $cursor: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    user(input: { userName: $userName }) {
      id
      displayName
      info {
        description
      }
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
  ${ArticleDigest.Feed.fragments.article}
`

const UserArticles: React.FC<WithRouterProps> = ({ router }) => {
  const userName = getQuery({ router, key: 'userName' })

  const viewer = useContext(ViewerContext)
  const isMe = viewer.userName === userName

  if (!userName) {
    return null
  }

  return (
    <Query query={USER_ARTICLES_FEED} variables={{ userName }}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: UserArticleFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        const connectionPath = 'user.articles'
        const { edges, pageInfo } = _get(data, connectionPath, {})
        const loadMore = () => {
          analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
            type: FEED_TYPE.USER_ARTICLE,
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

        if (!edges || edges.length <= 0) {
          return <EmptyArticle />
        }

        return (
          <>
            <Head
              title={{
                zh_hant: `${data.user.displayName}的創作空間站`,
                zh_hans: `${data.user.displayName}的创作空间站`
              }}
              description={data.user.info.description}
              image={ICON_192}
            />
            <InfiniteScroll
              hasNextPage={pageInfo.hasNextPage}
              loadMore={loadMore}
            >
              <ul>
                {edges.map(
                  ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                    <li
                      key={cursor}
                      onClick={() =>
                        analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                          type: FEED_TYPE.USER_ARTICLE,
                          location: i
                        })
                      }
                    >
                      <ArticleDigest.Feed
                        article={node}
                        hasBookmark
                        hasDateTime
                        hasFingerprint={isMe}
                        hasState
                      />
                    </li>
                  )
                )}
              </ul>
            </InfiniteScroll>
          </>
        )
      }}
    </Query>
  )
}

export default withRouter(UserArticles)
