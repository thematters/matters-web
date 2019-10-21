import { useEffect } from 'react'

import {
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Translate
} from '~/components'
import EmptyNotice from '~/components/Empty/EmptyNotice'
import { useMutation, useQuery } from '~/components/GQL'
import { MarkAllNoticesAsRead } from '~/components/GQL/mutations/__generated__/MarkAllNoticesAsRead'
import MARK_ALL_NOTICES_AS_READ from '~/components/GQL/mutations/markAllNoticesAsRead'
import { MeNotifications } from '~/components/GQL/queries/__generated__/MeNotifications'
import { ME_NOTIFICATIONS } from '~/components/GQL/queries/notice'
import updateViewerUnreadNoticeCount from '~/components/GQL/updates/viewerUnreadNoticeCount'
import NoticeDigest from '~/components/NoticeDigest'

import { mergeConnections } from '~/common/utils'

import styles from './styles.css'

const Notifications = () => {
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
  const { edges, pageInfo } = (data && data.viewer && data.viewer.notices) || {}

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
      <ul>
        {edges.map(({ node, cursor }) => (
          <li key={cursor}>
            <NoticeDigest notice={node} key={cursor} />
          </li>
        ))}

        <style jsx>{styles}</style>
      </ul>
    </InfiniteScroll>
  )
}

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Head title={{ zh_hant: '全部通知', zh_hans: '全部通知' }} />

      <PageHeader
        pageTitle={<Translate zh_hant="全部通知" zh_hans="全部通知" />}
      />

      <section>
        <Notifications />
      </section>
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Footer />
    </aside>

    <style jsx>{styles}</style>
  </main>
)
