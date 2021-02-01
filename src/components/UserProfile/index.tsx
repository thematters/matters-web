import _some from 'lodash/some'
import Link from 'next/link'
import { useContext, useEffect } from 'react'

import {
  Avatar,
  Cover,
  Error,
  Expandable,
  FollowButton,
  Layout,
  Spinner,
  Throw404,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'

import { CivicLikerBadge, SeedBadge } from './Badges'
import CircleWidget from './CircleWidget'
import DropdownActions from './DropdownActions'
import EditProfileButton from './EditProfileButton'
import { USER_PROFILE_PRIVATE, USER_PROFILE_PUBLIC } from './gql'
import styles from './styles.css'

import { UserProfileUserPublic } from './__generated__/UserProfileUserPublic'

export const UserProfile = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

  // public data
  const userName = getQuery('name')
  const isMe = !userName || viewer.userName === userName
  const { data, loading, client } = usePublicQuery<UserProfileUserPublic>(
    USER_PROFILE_PUBLIC,
    {
      variables: { userName },
    }
  )
  const user = data?.user

  // fetch private data
  useEffect(() => {
    if (!viewer.isAuthed || !user) {
      return
    }

    client.query({
      query: USER_PROFILE_PRIVATE,
      fetchPolicy: 'network-only',
      variables: {
        userName,
      },
    })
  }, [user?.id, viewer.id])

  /**
   * Render
   */
  const LayoutHeader = () => (
    <Layout.Header
      left={<Layout.Header.BackButton mode="black-solid" />}
      right={
        <>
          <span />
          {user && <DropdownActions user={user} isMe={isMe} />}
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

  if (!user) {
    return (
      <>
        <LayoutHeader />
        <Throw404 />
      </>
    )
  }

  if (user?.status?.state === 'archived') {
    return (
      <>
        <LayoutHeader />
        <Error
          statusCode={404}
          message={
            <Translate
              zh_hant="此帳戶因為違反社區約章而被註銷"
              zh_hans="此帐户因为违反社区约章而被注销"
            />
          }
        />
      </>
    )
  }

  const userFollowersPath = toPath({
    page: 'userFollowers',
    userName,
  })
  const userFolloweesPath = toPath({
    page: 'userFollowees',
    userName,
  })
  const badges = user.info.badges || []
  const circles = user.ownCircles || []
  const hasSeedBadge = _some(badges, { type: 'seed' })
  const profileCover = user.info.profileCover || ''
  const userState = user.status?.state as string
  const isCivicLiker = user.liker.civicLiker
  const isUserArchived = userState === 'archived'
  const isUserBanned = userState === 'banned'
  const isUserInactive = isUserArchived || isUserBanned

  /**
   * Inactive User
   */
  if (isUserInactive) {
    return (
      <>
        <LayoutHeader />

        <section className="user-profile">
          <Cover fallbackCover={IMAGE_COVER} />

          <header>
            <section className="avatar">
              <Avatar size="xxl" />
            </section>
          </header>

          <section className="info">
            <section className="display-name">
              <h1 className="name">
                {isUserArchived && <Translate id="accountArchived" />}
                {isUserBanned && <Translate id="accountBanned" />}
              </h1>
            </section>
          </section>

          <style jsx>{styles}</style>
        </section>
      </>
    )
  }

  /**
   * Active or Onboarding User
   */
  return (
    <>
      <LayoutHeader />

      <section className="user-profile">
        <Cover cover={profileCover} fallbackCover={IMAGE_COVER} />

        <header>
          <section className="avatar">
            <Avatar size="xxl" user={user} />
          </section>

          {!isMe ? (
            <FollowButton user={user} size="lg" />
          ) : (
            <EditProfileButton user={user} />
          )}
        </header>

        <section className="info">
          <section className="display-name">
            <h1 className="name">{user.displayName}</h1>
            {hasSeedBadge && <SeedBadge />}
            {isCivicLiker && <CivicLikerBadge />}
          </section>

          <section className="username">
            <span className="name">@{user.userName}</span>
            {!isMe && <FollowButton.State user={user} />}
          </section>

          <Expandable>
            <p className="description">{user.info.description}</p>
          </Expandable>
        </section>

        <footer>
          <Link {...userFollowersPath}>
            <a>
              <span className="count">
                {numAbbr(user.followers.totalCount)}
              </span>
              <Translate id="follower" />
            </a>
          </Link>

          <Link {...userFolloweesPath}>
            <a>
              <span className="count">
                {numAbbr(user.followees.totalCount)}
              </span>
              <Translate id="following" />
            </a>
          </Link>
        </footer>

        <CircleWidget circles={circles} isMe={isMe} />

        <style jsx>{styles}</style>
      </section>
    </>
  )
}
