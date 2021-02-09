import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import {
  EmptyLayout,
  Head,
  Layout,
  PullToRefresh,
  QueryError,
  Spinner,
  SubscribeCircleDialog,
  Tabs,
  Throw404,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'

import DropdownActions from './DropdownActions'
import { CIRCLE_DETAIL_PRIVATE, CIRCLE_DETAIL_PUBLIC } from './gql'
import CircleProfile from './Profile'
import styles from './styles.css'
import SubscriptionBanner from './SubscriptionBanner'
import Works from './Works'

import {
  CircleDetailPublic,
  CircleDetailPublic_circle,
} from './__generated__/CircleDetailPublic'

const DynamicDiscussion = dynamic(() => import('./Discussion'), {
  ssr: false,
  loading: Spinner,
})
const DynamicBroadcast = dynamic(() => import('./Broadcast'), {
  ssr: false,
  loading: Spinner,
})

type CircleFeedType = 'works' | 'discussion' | 'boardcast'

const CircleDetail = ({
  circle,
  privateFetched,
}: {
  circle: CircleDetailPublic_circle
  privateFetched: boolean
}) => {
  // feed type
  const [feed, setFeed] = useState<CircleFeedType>('works')
  const isWorks = feed === 'works'
  const isDiscussion = feed === 'discussion'
  const isBoardcast = feed === 'boardcast'

  /**
   * Render
   */
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
          <Tabs sticky>
            <Tabs.Tab selected={isWorks} onClick={() => setFeed('works')}>
              <Translate id="article" />
            </Tabs.Tab>

            <Tabs.Tab
              selected={isDiscussion}
              onClick={() => setFeed('discussion')}
            >
              <Translate id="circleDiscussion" />
            </Tabs.Tab>

            <Tabs.Tab
              selected={isBoardcast}
              onClick={() => setFeed('boardcast')}
            >
              <Translate id="circleBroadcast" />
            </Tabs.Tab>
          </Tabs>

          {isWorks && <Works name={circle.name} />}
          {isDiscussion && <DynamicDiscussion />}
          {isBoardcast && <DynamicBroadcast />}

          <SubscribeCircleDialog circle={circle} />
          {privateFetched && <SubscriptionBanner circle={circle} />}

          <style jsx>{styles}</style>
        </section>
      </PullToRefresh>
    </Layout.Main>
  )
}

const CircleDetailContainer = () => {
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

  return <CircleDetail circle={circle} privateFetched={privateFetched} />
}

export default CircleDetailContainer
