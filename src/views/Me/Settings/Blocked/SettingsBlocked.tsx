import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  Empty,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
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
  const { data, loading, error, fetchMore } = useQuery<ViewerBlockListQuery>(
    VIEWER_BLOCK_LIST,
    {
      fetchPolicy: 'network-only',
    }
  )

  const intl = useIntl()

  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.blockList'
  const { edges, pageInfo } = data?.viewer?.blockList || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <Empty
        spacingY="xxloose"
        description={intl.formatMessage({
          defaultMessage: 'No blocked users yet',
          id: 'dAvP6d',
          description: 'src/views/Me/Settings/Blocked/SettingsBlocked.tsx',
        })}
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
          <List.Item key={node.id}>
            <UserDigest.Rich
              user={node}
              spacing={[16, 0]}
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
