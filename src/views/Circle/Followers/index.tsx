import { useContext, useEffect } from 'react'

import {
  EmptyLayout,
  Head,
  Layout,
  PullToRefresh,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import DropdownActions from '../Detail/DropdownActions'
import { CIRCLE_DETAIL_PRIVATE, CIRCLE_DETAIL_PUBLIC } from '../Detail/gql'
import CircleProfile from '../Detail/Profile'
import CircleFollowers from './CircleFollowers'
import styles from './styles.css'

import { CircleDetailPublic } from '../Detail/__generated__/CircleDetailPublic'

const CircleFollowersContainer = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  /**
   * Public data fetching
   */
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

  /**
   * Private data fetching
   */
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

  useEffect(() => loadPrivate(), [name, viewer.id])

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

      <Head
        title={{
          zh_hant: `${circle.displayName}的追蹤者`,
          zh_hans: `${circle.displayName}的追踪者`,
        }}
        description={circle.description}
        image={circle.cover || IMAGE_LOGO_192}
      />

      <PullToRefresh>
        <CircleProfile circle={circle} />

        <section className="content">
          <CircleFollowers />
        </section>
      </PullToRefresh>
      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default CircleFollowersContainer
