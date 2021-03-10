import { useContext, useEffect, useState } from 'react'

import {
  CircleAvatar,
  CircleCover,
  Expandable,
  Layout,
  Spinner,
  SubscribeCircleDialog,
  Throw404,
  Translate,
  useEventListener,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'

import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import { numAbbr } from '~/common/utils'

import CIRCLE_COVER from '@/public/static/images/circle-cover.svg'

import SubscriptionBanner from '../SubscriptionBanner'
import AuthorWidget from './AuthorWidget'
import DropdownActions from './DropdownActions'
import EditButton from './EditButton'
import FollowButton from './FollowButton'
import { FollowersDialog } from './FollowersDialog'
import { CIRCLE_PROFILE_PRIVATE, CIRCLE_PROFILE_PUBLIC } from './gql'
import { MembersDialog } from './MembersDialog'
import styles from './styles.css'

import { CircleProfileCirclePublic } from './__generated__/CircleProfileCirclePublic'

const CircleProfile = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  // public data
  const {
    data,
    loading,
    client,
    refetch: refetchPublic,
  } = usePublicQuery<CircleProfileCirclePublic>(CIRCLE_PROFILE_PUBLIC, {
    variables: { name },
  })
  const circle = data?.circle
  const isOwner = circle?.owner.id === viewer.id

  // private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async () => {
    if (!viewer.isAuthed) {
      return
    }

    await client.query({
      query: CIRCLE_PROFILE_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name },
    })

    setPrivateFetched(true)
  }

  // fetch private data
  useEffect(() => {
    if (!circle?.id) {
      return
    }

    if (viewer.isAuthed) {
      loadPrivate()
    } else if (viewer.privateFetched) {
      setPrivateFetched(true)
    }
  }, [circle?.id, viewer.privateFetched])

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
  const LayoutHeader = () => (
    <Layout.Header
      left={<Layout.Header.BackButton mode="black-solid" />}
      right={
        <>
          <span />
          {circle && <DropdownActions circle={circle} />}
        </>
      }
      mode="transparent-absolute"
    />
  )

  if (loading) {
    return (
      <>
        <LayoutHeader />
        <Spinner />
      </>
    )
  }

  if (!circle) {
    return (
      <>
        <LayoutHeader />
        <Throw404 />
      </>
    )
  }

  return (
    <>
      <LayoutHeader />

      <section className="profile">
        <CircleCover cover={circle.cover} fallbackCover={CIRCLE_COVER} />

        <header>
          <CircleAvatar size="xxl" circle={circle} />

          <h2 className="name">{circle.displayName}</h2>
        </header>

        <section className="info">
          {circle.description && (
            <Expandable>
              <p className="description">{circle.description}</p>
            </Expandable>
          )}
        </section>

        <footer>
          <section className="counts">
            <MembersDialog circle={circle}>
              {({ open: openMembersDialog }) => (
                <button type="button" onClick={openMembersDialog}>
                  <span className="count">
                    {numAbbr(circle.members.totalCount)}
                  </span>
                  <Translate id="members" />
                </button>
              )}
            </MembersDialog>

            <FollowersDialog circle={circle}>
              {({ open: openFollowersDialog }) => (
                <button type="button" onClick={openFollowersDialog}>
                  <span className="count">
                    {numAbbr(circle.followers.totalCount)}
                  </span>
                  <Translate id="follower" />
                </button>
              )}
            </FollowersDialog>
          </section>

          {isOwner ? (
            <EditButton circle={circle} />
          ) : (
            <FollowButton circle={circle} />
          )}
        </footer>
        <AuthorWidget circle={circle} />

        <SubscribeCircleDialog circle={circle} />
        {privateFetched && <SubscriptionBanner circle={circle} />}

        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default CircleProfile
