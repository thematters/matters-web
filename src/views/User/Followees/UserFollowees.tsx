import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import {
  EmptyWarning,
  Head,
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  usePullToRefresh,
} from '~/components'
import { QueryError } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { analytics, getQuery, mergeConnections } from '~/common/utils'

import { UserFolloweeFeed } from './__generated__/UserFolloweeFeed'

const USER_FOLLOWEES_FEED = gql`
  query UserFolloweeFeed($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      followees(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...UserDigestRichUserPublic
            ...UserDigestRichUserPrivate
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`

const UserFollowees = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })
  const { data, loading, error, fetchMore, refetch } = useQuery<
    UserFolloweeFeed
  >(USER_FOLLOWEES_FEED, {
    variables: { userName },
  })

  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  if (loading || !data || !data.user) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const user = data.user
  const connectionPath = 'user.followees'
  const { edges, pageInfo } = user.followees

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={
          <Translate zh_hant="還沒有追蹤任何人" zh_hans="还没有追踪任何人" />
        }
      />
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'followee',
      location: edges.length,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <>
      <Head
        title={{
          zh_hant: `${user.displayName}追蹤的作者`,
          zh_hans: `${user.displayName}追踪的作者`,
        }}
      />

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'followee',
                    contentType: 'user',
                    styleType: 'card',
                    location: i,
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default UserFollowees
