import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'

import { mergeConnections } from '~/common/utils'
import {
  EmptyNotice,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Media,
  Notice,
  Spacer,
  Spinner,
  useMutation,
} from '~/components'
import updateViewerUnreadNoticeCount from '~/components/GQL/updates/viewerUnreadNoticeCount'
import {
  MarkAllNoticesAsReadMutation,
  MeNotificationsQuery,
} from '~/gql/graphql'

const ME_NOTIFICATIONS = gql`
  query MeNotifications($after: String) {
    viewer {
      id
      notices(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DigestNotice
          }
        }
      }
    }
  }
  ${Notice.fragments.notice}
`

const MARK_ALL_NOTICES_AS_READ = gql`
  mutation MarkAllNoticesAsRead {
    markAllNoticesAsRead
  }
`

const BaseNotifications = () => {
  const [markAllNoticesAsRead] = useMutation<MarkAllNoticesAsReadMutation>(
    MARK_ALL_NOTICES_AS_READ,
    {
      update: updateViewerUnreadNoticeCount,
    }
  )
  const { data, loading, fetchMore } = useQuery<
    MeNotificationsQuery,
    { first: number; after?: number }
  >(ME_NOTIFICATIONS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    markAllNoticesAsRead()
  }, [])

  const connectionPath = 'viewer.notices'
  const { edges, pageInfo } = data?.viewer?.notices || {}

  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyNotice />
  }

  const loadMore = () =>
    fetchMore({
      variables: { first: 20, after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List spacing={['xloose', 0]}>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <Notice notice={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const Notifications = () => {
  return (
    <Layout.Main>
      <Media at="sm">
        <Layout.Header
          left={<Layout.Header.MeButton />}
          right={<Layout.Header.Title id="notifications" />}
        />
        <Spacer size="base" />
      </Media>
      <Media greaterThan="sm">
        <Spacer size="xloose" />
      </Media>

      <Head title={{ id: 'notifications' }} />

      <Layout.Main.Spacing>
        <BaseNotifications />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Notifications
