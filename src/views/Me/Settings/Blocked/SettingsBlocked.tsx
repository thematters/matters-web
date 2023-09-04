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

import { ToggleBlockUserButton } from './ToggleBlockButton'

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
            ...ToggleBlockUserButtonUserPrivate
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
  ${ToggleBlockUserButton.fragments.user.private}
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

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={
          <Translate
            zh_hant="還沒有封鎖用戶"
            zh_hans="还没有封锁用户"
            en="No blocked users yet"
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
      <List hasBorder>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <UserDigest.Rich
              user={node}
              spacing={['base', 0]}
              subtitle={`@${node.userName}`}
              hasFollow={false}
              extraButton={<ToggleBlockUserButton user={node} />}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default SettingsBlocked
