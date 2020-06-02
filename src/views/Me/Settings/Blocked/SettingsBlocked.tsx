import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  EmptyWarning,
  InfiniteScroll,
  List,
  Spinner,
  Translate,
} from '~/components'
import { QueryError } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { mergeConnections } from '~/common/utils'

import { ViewerBlockList } from './__generated__/ViewerBlockList'

const VIEWER_BLOCK_LIST = gql`
  query ViewerBlockList($after: String) {
    viewer {
      id
      blockList(input: { first: 20, after: $after }) {
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

const SettingsBlocked = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    ViewerBlockList
  >(VIEWER_BLOCK_LIST)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.blockList'
  const { edges, pageInfo } = data?.viewer?.blockList || {}

  const filteredUsers = (edges || []).filter(({ node }) => node.isBlocked)

  if (!edges || edges.length <= 0 || filteredUsers.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={
          <Translate zh_hant="還沒有封鎖用戶" zh_hans="还没有屏蔽用户" />
        }
      />
    )
  }

  const loadMore = () => {
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
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List hasBorder={false}>
        {filteredUsers.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <UserDigest.Rich user={node} hasUnblock hasFollow={false} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default SettingsBlocked
