import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import {
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  usePullToRefresh,
  UserDigest,
} from '~/components'

import { analytics, getQuery, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'

import { SeachUsers } from './__generated__/SeachUsers'

const SEARCH_USERS = gql`
  query SeachUsers($key: String!, $after: String) {
    search(input: { key: $key, type: User, first: 20, after: $after }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestRichUser
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const SearchUser = () => {
  const router = useRouter()
  const q = getQuery({ router, key: 'q' })

  const { data, loading, fetchMore, refetch } = useQuery<SeachUsers>(
    SEARCH_USERS,
    {
      variables: { key: q },
    }
  )

  usePullToRefresh.Handler(refetch)

  if (loading) {
    return <Spinner />
  }

  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptySearch description={<Translate id="emptySearchResults" />} />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'search_user',
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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List hasBorder={false}>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'User' && (
              <List.Item key={cursor}>
                <UserDigest.Rich
                  user={node}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'search_user',
                      contentType: 'user',
                      styleType: 'card',
                      location: i,
                    })
                  }
                />
              </List.Item>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

export default SearchUser
