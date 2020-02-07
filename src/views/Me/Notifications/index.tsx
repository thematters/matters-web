import { useQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'

import {
  Footer,
  Head,
  InfiniteScroll,
  List,
  PageHeader,
  Spinner,
  Translate
} from '~/components'
import EmptyNotice from '~/components/Empty/EmptyNotice'
import { useMutation } from '~/components/GQL'
import MARK_ALL_NOTICES_AS_READ from '~/components/GQL/mutations/markAllNoticesAsRead'
import { ME_NOTIFICATIONS } from '~/components/GQL/queries/notice'
import updateViewerUnreadNoticeCount from '~/components/GQL/updates/viewerUnreadNoticeCount'
import { Notice } from '~/components/Notice'

import { mergeConnections } from '~/common/utils'

import styles from './styles.css'

import { MarkAllNoticesAsRead } from '~/components/GQL/mutations/__generated__/MarkAllNoticesAsRead'
import { MeNotifications } from '~/components/GQL/queries/__generated__/MeNotifications'

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
        <List spacing={['xloose', 0]} hasBorder>
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

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Head title={{ zh_hant: '全部通知', zh_hans: '全部通知' }} />

      <PageHeader title={<Translate zh_hant="全部通知" zh_hans="全部通知" />} />

      <section>
        <Notifications />
      </section>
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Footer />
    </aside>
  </main>
)
