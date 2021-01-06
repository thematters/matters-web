import _some from 'lodash/some'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import {
  CircleAvatar,
  CircleCover,
  Expandable,
  Layout,
  Spinner,
  Throw404,
  Translate,
  usePublicQuery,
  ViewerContext,
} from '~/components'

import { getQuery, numAbbr } from '~/common/utils'

import CIRCLE_COVER from '@/public/static/images/circle-cover.svg'

import FollowButton from './FollowButton'
import { CIRCLE_PROFILE_PRIVATE, CIRCLE_PROFILE_PUBLIC } from './gql'
import styles from './styles.css'

import { CircleProfilePublic } from './__generated__/CircleProfilePublic'

const CircleProfile = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)

  // public data
  const name = getQuery({ router, key: 'name' })
  const { data, loading, client } = usePublicQuery<CircleProfilePublic>(
    CIRCLE_PROFILE_PUBLIC,
    {
      variables: { name },
    }
  )
  const circle = data?.circle

  // fetch private data
  useEffect(() => {
    if (!viewer.isAuthed || !circle) {
      return
    }

    client.query({
      query: CIRCLE_PROFILE_PRIVATE,
      fetchPolicy: 'network-only',
      variables: {
        name,
      },
    })
  }, [circle?.id, viewer.id])

  /**
   * Render
   */
  const LayoutHeader = () => (
    <Layout.Header
      left={<Layout.Header.BackButton mode="black-solid" />}
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
            <button type="button">
              <span className="count">
                {numAbbr(circle.members.totalCount)}
              </span>
              <Translate id="members" />
            </button>

            <button type="button">
              <span className="count">
                {numAbbr(circle.followers.totalCount)}
              </span>
              <Translate id="follower" />
            </button>
          </section>

          <FollowButton circle={circle} />
        </footer>

        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default CircleProfile
