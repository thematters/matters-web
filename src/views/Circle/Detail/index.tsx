import { useContext, useEffect, useState } from 'react'

import {
  EmptyLayout,
  Head,
  Layout,
  PullToRefresh,
  QueryError,
  Spinner,
  SubscribeCircleDialog,
  Throw404,
  useEventListener,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'

import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'

import CircleDetailTabs from './CircleDetailTabs'
import DropdownActions from './DropdownActions'
import { CIRCLE_DETAIL_PRIVATE, CIRCLE_DETAIL_PUBLIC } from './gql'
import CircleProfile from './Profile'
import styles from './styles.css'
import SubscriptionBanner from './SubscriptionBanner'

import { CircleDetailPublic } from './__generated__/CircleDetailPublic'

const CircleDetailContainer: React.FC = ({ children }) => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const name = getQuery('name')
  const [privateFetched, setPrivateFetched] = useState(false)

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<CircleDetailPublic>(CIRCLE_DETAIL_PUBLIC, {
    variables: { name },
  })
  const circle = data?.circle

  // private data
  const loadPrivate = async () => {
    if (!viewer.isAuthed || !name) {
      return
    }

    await client.query({
      query: CIRCLE_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name },
    })

    setPrivateFetched(true)
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate()
  }, [name, viewer.id])

  // refetch & pull to refresh
  const refetch = async () => {
    await refetchPublic()
    loadPrivate()
  }
  useEventListener(REFETCH_CIRCLE_DETAIL, refetch)
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  if (!circle) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton mode="black-solid" />}
        right={
          <>
            <span />

            <DropdownActions circle={circle} />
          </>
        }
        mode="transparent-absolute"
      />

      <Head title={circle.displayName} />

      <PullToRefresh>
        <CircleProfile circle={circle} />

        <section className="content">
          <CircleDetailTabs />

          {children}

          <SubscribeCircleDialog circle={circle} />
          {privateFetched && <SubscriptionBanner circle={circle} />}

          <style jsx>{styles}</style>
        </section>
      </PullToRefresh>
    </Layout.Main>
  )
}

export default CircleDetailContainer
