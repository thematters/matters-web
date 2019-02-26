import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import { Error, Head, InfiniteScroll, Placeholder, Spinner } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { getQuery, mergeConnections } from '~/common/utils'

import { UserFollowerFeed } from './__generated__/UserFollowerFeed'
import EmptyFollowers from './EmptyFollowers'

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

const UserFollowers: React.FC<WithRouterProps> = ({ router }) => {
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

        if (error) {
          return <Error error={error} />
        }

        const connectionPath = 'user.followers'
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
          return <EmptyFollowers />
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

export default withRouter(UserFollowers)
