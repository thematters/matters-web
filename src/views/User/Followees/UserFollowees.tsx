import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Head, InfiniteScroll, List, Spinner, Translate } from '~/components'
import EmptyWarning from '~/components/Empty/EmptyWarning'
import { QueryError } from '~/components/GQL'
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
            ...UserDigestRichUser
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const UserFollowees = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })
  const { data, loading, error, fetchMore } = useQuery<UserFolloweeFeed>(
    USER_FOLLOWEES_FEED,
    {
      variables: { userName }
    }
  )

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
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.FOLLOWEE,
      location: edges.length,
      entrance: user.id
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

  return (
    <>
      <Head
        title={{
          zh_hant: `${user.displayName}追蹤的作者`,
          zh_hans: `${user.displayName}追踪的作者`
        }}
      />
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                hasFollow
                onClick={() =>
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                    type: FEED_TYPE.FOLLOWEE,
                    location: i,
                    entrance: user.id
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
