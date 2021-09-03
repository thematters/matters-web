import { useContext, useEffect } from 'react'

import {
  Avatar,
  Cover,
  Error,
  Expandable,
  FollowUserButton,
  Layout,
  Spinner,
  Throw404,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import ShareButton from '~/components/Layout/Header/ShareButton'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'

import AboutMeButton from './AboutMeButton'
import {
  ArchitectBadge,
  CivicLikerBadge,
  GoldenMotorBadge,
  SeedBadge,
} from './Badges'
import CircleFeatures from './CircleFeatures'
import CircleWidget from './CircleWidget'
import DropdownActions from './DropdownActions'
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
      variables: { userName },
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
          {user && (
            <section className="buttons">
              <ShareButton />
              <DropdownActions user={user} isMe={isMe} />
              <style jsx>{styles}</style>
            </section>
          )}
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
              en="This account is archived because of violating community guidelines"
            />
          }
        />
      </>
    )
  }

  const badges = user.info.badges || []
  const circles = user.ownCircles || []
  const hasSeedBadge = badges.some((b) => b.type === 'seed')
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasGoldenMotorBadge = badges.some((b) => b.type === 'golden_motor')
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

        <section className="container">
          <header>
            <Cover fallbackCover={IMAGE_COVER.src} type="user" />

            <section className="info">
              <Avatar size="xl" />

              <section className="name">
                <h2 className="displayName">
                  {isUserArchived && <Translate id="accountArchived" />}
                  {isUserBanned && <Translate id="accountBanned" />}
                </h2>
              </section>
            </section>
          </header>

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

      <section className="container">
        <header>
          <Cover
            cover={profileCover}
            fallbackCover={IMAGE_COVER.src}
            type="user"
          />

          <section className="info">
            <Avatar size="xl" user={user} />

            <section className="name">
              <h2 className="displayName">{user.displayName}</h2>
              <p className="userName">@{user.userName}</p>
            </section>
          </section>

          {!isMe && (
            <section className="followButton">
              <FollowUserButton user={user} inProfile />
            </section>
          )}
        </header>

        <section className="badges">
          <AboutMeButton userName={userName} />
          {hasSeedBadge && <SeedBadge />}
          {hasGoldenMotorBadge && <GoldenMotorBadge />}
          {hasArchitectBadge && <ArchitectBadge />}
          {isCivicLiker && <CivicLikerBadge />}
          {!isMe && <FollowUserButton.State user={user} />}
        </section>

        <Expandable>
          <p className="description">{user.info.description}</p>
        </Expandable>

        <CircleFeatures userName={user?.userName} circles={circles} />

        <CircleWidget circles={circles} isMe={isMe} />

        <style jsx>{styles}</style>
      </section>
    </>
  )
}
