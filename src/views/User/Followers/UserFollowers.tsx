import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Head, InfiniteScroll, Placeholder, Translate } from '~/components'
import EmptyWarning from '~/components/Empty/EmptyWarning'
import { QueryError } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'

import { UserFollowerFeed } from './__generated__/UserFollowerFeed'

const USER_FOLLOWERS_FEED = gql`
  query UserFollowerFeed($userName: String!, $after: String) {
    user(input: { userName: $userName }) {
      id
      displayName
      followers(input: { first: 10, after: $after }) {
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

const UserFollowers = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })
  const { data, loading, error, fetchMore } = useQuery<UserFollowerFeed>(
    USER_FOLLOWERS_FEED,
    {
      variables: { userName }
    }
  )

  if (loading || !data || !data.user) {
    return <Placeholder.ArticleDigestList />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const user = data.user
  const connectionPath = 'user.followers'
  const { edges, pageInfo } = user.followers

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={
          <Translate zh_hant="還沒有追蹤者" zh_hans="还没有追踪者" />
        }
      />
    )
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.FOLLOWER,
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
          zh_hant: `${user.displayName}的追蹤者`,
          zh_hans: `${user.displayName}的追踪者`
        }}
      />
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <ul className="u-list-gap">
          {edges.map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.FOLLOWER,
                  location: i,
                  entrance: user.id
                })
              }
            >
              <UserDigest.Rich user={node} hasFollow />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </>
  )
}

export default UserFollowers
