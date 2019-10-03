import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { QueryResult } from 'react-apollo'

import { Head, InfiniteScroll, Placeholder } from '~/components'
import EmptyFollowee from '~/components/Empty/EmptyFollowee'
import { Query } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'

import { UserFolloweeFeed } from './__generated__/UserFolloweeFeed'

const USER_FOLLOWEES_FEED = gql`
  query UserFolloweeFeed($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      followees(input: { first: 10, after: $after }) {
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

const UserFollowees: React.FC<WithRouterProps> = ({ router }) => {
  const userName = getQuery({ router, key: 'userName' })

  return (
    <Query query={USER_FOLLOWEES_FEED} variables={{ userName }}>
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: UserFolloweeFeed }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        const connectionPath = 'user.followees'
        const { edges, pageInfo } = _get(data, connectionPath, {})
        const loadMore = () => {
          analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
            type: FEED_TYPE.FOLLOWEE,
            location: edges.length,
            entrance: data.user.id
          })
          return fetchMore({
            variables: {
              after: pageInfo.endCursor
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
          return <EmptyFollowee />
        }

        return (
          <>
            <Head
              title={{
                zh_hant: `${data.user.displayName}追蹤的作者`,
                zh_hans: `${data.user.displayName}追踪的作者`
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
                          type: FEED_TYPE.FOLLOWEE,
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

export default withRouter(UserFollowees)
