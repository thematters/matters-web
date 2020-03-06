import { useQuery } from '@apollo/react-hooks'
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
import MARK_ALL_NOTICES_AS_READ from '~/components/GQL/mutations/markAllNoticesAsRead'
import { ME_NOTIFICATIONS } from '~/components/GQL/queries/notice'
import updateViewerUnreadNoticeCount from '~/components/GQL/updates/viewerUnreadNoticeCount'

import { mergeConnections } from '~/common/utils'

import styles from './styles.css'

import { MarkAllNoticesAsRead } from '~/components/GQL/mutations/__generated__/MarkAllNoticesAsRead'
import { MeNotifications } from '~/components/GQL/queries/__generated__/MeNotifications'

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
    if (!loading) {
      markAllNoticesAsRead()
    }
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
    <section className="container">
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List spacing={['xloose', 'base']} hasBorder>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <Notice notice={node} />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      <style jsx>{styles}</style>
    </section>
  )
}

const Notifications = () => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Layout>
      <Layout.Header
        left={
          isSmallUp ? <Layout.Header.BackButton /> : <Layout.Header.MeButton />
        }
        right={<Layout.Header.Title id="notification" />}
      />

      <Head title={{ id: 'notification' }} />

      <BaseNotifications />
    </Layout>
  )
}

export default Notifications
