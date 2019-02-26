import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import { Error, Head, InfiniteScroll, Placeholder, Spinner } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { getQuery, mergeConnections } from '~/common/utils'

import { UserFolloweeFeed } from './__generated__/UserFolloweeFeed'
import EmptyFollowees from './EmptyFollowees'

const USER_FOLLOWEES_FEED = gql`
  query UserFolloweeFeed($userName: String!, $cursor: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      followees(input: { first: 10, after: $cursor }) {
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

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'user.followees'
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

        if (edges.length <= 0) {
          return <EmptyFollowees />
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
              loading={loading}
              loader={<Spinner />}
            >
              <ul>
                {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <UserDigest.FullDesc user={node} nameSize="small" />
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          </>
        )
      }}
    </Query>
  )
}

export default withRouter(UserFollowees)
