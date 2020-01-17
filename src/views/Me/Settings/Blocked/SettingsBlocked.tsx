import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Head,
  InfiniteScroll,
  List,
  PageHeader,
  Spinner,
  Translate
} from '~/components'
import EmptyWarning from '~/components/Empty/EmptyWarning'
import { QueryError } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { ViewerBlockList } from './__generated__/ViewerBlockList'

const VIEWER_BLOCK_LIST = gql`
  query ViewerBlockList($after: String) {
    viewer {
      id
      blockList(input: { first: 10, after: $after }) {
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
  const { data, loading, error, fetchMore } = useQuery<ViewerBlockList>(
    VIEWER_BLOCK_LIST
  )

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
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.ALL_AUTHORS,
      location: edges.length
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
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List>
        {filteredUsers.map(({ node, cursor }, i) => (
          <List.Item noBorder key={cursor}>
            <UserDigest.Rich
              user={node}
              hasUnblock
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.ALL_AUTHORS,
                  location: i
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default () => (
  <>
    <Head
      title={{
        zh_hant: TEXT.zh_hant.blockedSetting,
        zh_hans: TEXT.zh_hans.blockedSetting
      }}
    />

    <PageHeader
      pageTitle={
        <Translate
          zh_hant={TEXT.zh_hant.blockedSetting}
          zh_hans={TEXT.zh_hans.blockedSetting}
        />
      }
      is="h2"
    />

    <SettingsBlocked />
  </>
)
