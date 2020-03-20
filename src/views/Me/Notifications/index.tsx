import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'

import {
  EmptyNotice,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Notice,
  Spinner,
  useResponsive
} from '~/components'
import { useMutation } from '~/components/GQL'
import updateViewerUnreadNoticeCount from '~/components/GQL/updates/viewerUnreadNoticeCount'

import { mergeConnections } from '~/common/utils'

import { MarkAllNoticesAsRead } from './__generated__/MarkAllNoticesAsRead'
import { MeNotifications } from './__generated__/MeNotifications'

const ME_NOTIFICATIONS = gql`
  query MeNotifications($first: Int, $after: String) {
    viewer {
      id
      notices(input: { first: $first, after: $after }) {
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
  const [markAllNoticesAsRead] = useMutation<MarkAllNoticesAsRead>(
    MARK_ALL_NOTICES_AS_READ,
    {
      update: updateViewerUnreadNoticeCount
    }
  )
  const { data, loading, fetchMore } = useQuery<
    MeNotifications,
    { first: number; after?: number }
  >(ME_NOTIFICATIONS, {
    variables: { first: 20 }
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
      variables: {
        first: 20,
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List spacing={['xloose', 'base']}>
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
  const isSmallUp = useResponsive('sm-up')

  return (
    <Layout.Main>
      <Layout.Header
        left={
          isSmallUp ? <Layout.Header.BackButton /> : <Layout.Header.MeButton />
        }
        right={<Layout.Header.Title id="notification" />}
      />

      <Head title={{ id: 'notification' }} />

      <BaseNotifications />
    </Layout.Main>
  )
}

export default Notifications
