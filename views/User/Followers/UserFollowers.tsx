import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useRouter } from 'next/router'
import { QueryResult } from 'react-apollo'

import { Head, InfiniteScroll, Placeholder } from '~/components'
import EmptyFollower from '~/components/Empty/EmptyFollower'
import { Query } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'

import { UserFollowerFeed } from './__generated__/UserFollowerFeed'

const USER_FOLLOWERS_FEED = gql`
  query UserFollowerFeed($userName: String!, $cursor: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      followers(input: { first: 10, after: $cursor }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...UserDigestFullDescUser
          }
        }
      }
    }
  }
  ${UserDigest.FullDesc.fragments.user}
`

const UserFollowers = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })

  return (
    <Query query={USER_FOLLOWERS_FEED} variables={{ userName }}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: UserFollowerFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        const connectionPath = 'user.followers'
        const { edges, pageInfo } = _get(data, connectionPath, {})
        const loadMore = () => {
          analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
            type: FEED_TYPE.FOLLOWER,
            location: edges.length,
            entrance: data.user.id
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
          return <EmptyFollower />
        }

        return (
          <>
            <Head
              title={{
                zh_hant: `${data.user.displayName}的追蹤者`,
                zh_hans: `${data.user.displayName}的追踪者`
              }}
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
                          type: FEED_TYPE.FOLLOWER,
                          location: i,
                          entrance: data.user.id
                        })
                      }
                    >
                      <UserDigest.FullDesc user={node} nameSize="small" />
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

export default UserFollowers
