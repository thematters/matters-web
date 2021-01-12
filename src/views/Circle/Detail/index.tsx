import _find from 'lodash/find'
import _some from 'lodash/some'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import {
  EmptyLayout,
  Head,
  Layout,
  PullToRefresh,
  Spinner,
  Tabs,
  Throw404,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { getQuery } from '~/common/utils'

import DropdownActions from './DropdownActions'
import { CIRCLE_DETAIL_PRIVATE, CIRCLE_DETAIL_PUBLIC } from './gql'
import CircleProfile from './Profile'
import styles from './styles.css'
import Works from './Works'

import {
  CircleDetailPublic,
  CircleDetailPublic_circle,
} from './__generated__/CircleDetailPublic'

type CircleFeedType = 'works' | 'discussion' | 'boardcast'

const CircleDetail = ({ circle }: { circle: CircleDetailPublic_circle }) => {
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

            <DropdownActions />
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
              <Translate zh_hant="眾聊" zh_hans="" />
            </Tabs.Tab>

            <Tabs.Tab
              selected={isBoardcast}
              onClick={() => setFeed('boardcast')}
            >
              <Translate zh_hant="廣播" zh_hans="" />
            </Tabs.Tab>
          </Tabs>

          {isWorks && <Works name={circle.name} />}
          {isDiscussion && <span>Discussion</span>}
          {isBoardcast && <span>Boardcast</span>}

          <style jsx>{styles}</style>
        </section>
      </PullToRefresh>
    </Layout.Main>
  )
}

const CircleDetailContainer = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const name = getQuery({ router, key: 'name' })

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
  const loadPrivate = () => {
    if (!viewer.isAuthed || !name) {
      return
    }

    client.query({
      query: CIRCLE_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name },
    })
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

  return <CircleDetail circle={circle} />
}

export default CircleDetailContainer
