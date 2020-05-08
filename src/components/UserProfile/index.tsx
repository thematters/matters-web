import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import _some from 'lodash/some'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Avatar,
  Error,
  Expandable,
  FollowButton,
  Layout,
  Spinner,
  Throw404,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'

import { getQuery, numAbbr, toPath } from '~/common/utils'

import { CivicLikerBadge, SeedBadge } from './Badges'
import Cover from './Cover'
import DropdownActions from './DropdownActions'
import EditProfileButton from './EditProfileButton'
import styles from './styles.css'

import { MeProfileUser } from './__generated__/MeProfileUser'
import { UserProfileUser } from './__generated__/UserProfileUser'

const fragments = {
  user: gql`
    fragment ProfileUser on User {
      id
      userName
      displayName
      liker {
        civicLiker
      }
      info {
        badges {
          type
        }
        description
        profileCover
      }
      followees(input: { first: 0 }) {
        totalCount
      }
      followers(input: { first: 0 }) {
        totalCount
      }
      status {
        state
      }
      ...AvatarUser
      ...FollowButtonUser @skip(if: $isMe)
      ...DropdownActionsUser
    }
    ${Avatar.fragments.user}
    ${FollowButton.fragments.user}
    ${DropdownActions.fragments.user}
  `,
}

const USER_PROFILE = gql`
  query UserProfileUser($userName: String!, $isMe: Boolean = false) {
    user(input: { userName: $userName }) {
      ...ProfileUser
    }
  }
  ${fragments.user}
`

const ME_PROFILE = gql`
  query MeProfileUser($isMe: Boolean = true) {
    viewer {
      ...ProfileUser
    }
  }
  ${fragments.user}
`

export const UserProfile = () => {
  const isSmallUp = useResponsive('sm-up')
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' })
  const isMe = !userName || viewer.userName === userName
  const { data, loading } = useQuery<MeProfileUser | UserProfileUser>(
    isMe ? ME_PROFILE : USER_PROFILE,
    {
      variables: isMe ? {} : { userName },
    }
  )
  const user = isMe ? _get(data, 'viewer') : _get(data, 'user')

  const LayoutHeader = () => (
    <Layout.Header
      left={
        <Layout.Header.BackButton
          mode={!isSmallUp ? 'black-solid' : undefined}
        />
      }
      right={
        <>
          {isSmallUp ? <Layout.Header.Title id="myProfile" /> : <span />}
          {user && <DropdownActions user={user} isMe={isMe} />}
        </>
      }
      mode={isSmallUp ? 'solid-fixed' : 'transparent-absolute'}
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
              zh_hant="此帳號因為違反社區約章而被註銷"
              zh_hans="此帐号因为违反社区约章而被注销"
            />
          }
        />
      </>
    )
  }

  const userFollowersPath = toPath({
    page: 'userFollowers',
    userName: user.userName,
  })
  const userFolloweesPath = toPath({
    page: 'userFollowees',
    userName: user.userName,
  })
  const badges = user.info.badges || []
  const hasSeedBadge = _some(badges, { type: 'seed' })
  const profileCover = user.info.profileCover || ''
  const isCivicLiker = user.liker.civicLiker
  const isUserArchived = user.status.state === 'archived'
  const isUserBanned = user.status.state === 'banned'
  const isUserInactive = isUserArchived || isUserBanned

  /**
   * Inactive User
   */
  if (isUserInactive) {
    return (
      <>
        <LayoutHeader />

        <section className="user-profile">
          <Cover />

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
        <Cover cover={profileCover} />

        <header>
          <section className="avatar">
            <Avatar size="xxl" user={user} hasCivicLikerRing />
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

        <style jsx>{styles}</style>
      </section>
    </>
  )
}
