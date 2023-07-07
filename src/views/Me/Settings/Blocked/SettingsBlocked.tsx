import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { mergeConnections } from '~/common/utils'
import {
  EmptyWarning,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Translate,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ViewerBlockListQuery } from '~/gql/graphql'

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

const SettingsBlocked = () => {
  const { data, loading, error, fetchMore } =
    useQuery<ViewerBlockListQuery>(VIEWER_BLOCK_LIST)

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
          <Translate
            zh_hant="還沒有封鎖用戶"
            zh_hans="还没有屏蔽用户"
            en="no blocked users yet"
          />
        }
      />
    )
  }

  const loadMore = () => {
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
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
