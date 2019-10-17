import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import _some from 'lodash/some'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useQuery } from 'react-apollo'

import { Avatar, Placeholder, Tooltip, Translate } from '~/components'
import { FollowButton } from '~/components/Button/Follow'
import { Icon } from '~/components/Icon'
import ShareButton from '~/components/ShareButton'
import ShareModal from '~/components/ShareButton/ShareModal'
import { UserProfileEditor } from '~/components/UserProfileEditor'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { getQuery, numAbbr, toPath } from '~/common/utils'
import ICON_SEED_BADGE from '~/static/icons/early-user-badge.svg?sprite'

import Throw404 from '../Throw404'
import { MeProfileUser } from './__generated__/MeProfileUser'
import { UserProfileUser } from './__generated__/UserProfileUser'
import Cover from './Cover'
import Description from './Description'
import EditProfileButton from './EditProfileButton'
import styles from './styles.css'

const fragments = {
  user: gql`
    fragment ProfileUser on User {
      id
      userName
      displayName
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
    }
    ${Avatar.fragments.user}
    ${FollowButton.fragments.user}
  `
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

const SeedBadge = () => (
  <Tooltip content={<Translate zh_hant="種子用戶" zh_hans="种子用户" />}>
    <span>
      <Icon
        id={ICON_SEED_BADGE.id}
        viewBox={ICON_SEED_BADGE.viewBox}
        style={{ width: 16, height: 16 }}
      />
    </span>
  </Tooltip>
)

const CoverContainer: React.FC = ({ children }) => (
  <>
    <div className="cover-container l-row">
      <section className="l-col-4 l-col-md-8 l-col-lg-12">{children}</section>
    </div>
    <style jsx>{styles}</style>
  </>
)

const BaseUserProfile = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' })
  const isMe = !userName || viewer.userName === userName
  const [editing, setEditing] = useState<boolean>(false)

  const containerClass = classNames({
    container: true,
    editing,
    inactive: isMe && viewer.isInactive
  })

  const { data, loading } = useQuery<MeProfileUser | UserProfileUser>(
    isMe ? ME_PROFILE : USER_PROFILE,
    {
      variables: isMe ? {} : { userName }
    }
  )
  const user = isMe ? _get(data, 'viewer') : _get(data, 'user')

  if (loading) {
    return (
      <section className={containerClass}>
        <CoverContainer>
          <Placeholder.UserProfile />
        </CoverContainer>
        <style jsx>{styles}</style>
      </section>
    )
  }

  if (isMe && editing) {
    return (
      <section className={containerClass}>
        <UserProfileEditor
          user={_get(data, 'viewer')}
          setEditing={setEditing}
        />
        <style jsx>{styles}</style>
      </section>
    )
  }

  if (!user) {
    return <Throw404 />
  }

  const userFollowersPath = toPath({
    page: 'userFollowers',
    userName: user.userName
  })
  const userFolloweesPath = toPath({
    page: 'userFollowees',
    userName: user.userName
  })
  const badges = _get(user, 'info.badges', [])
  const hasSeedBadge = _some(badges, { type: 'seed' })
  const profileCover = _get(user, 'info.profileCover', '')

  return (
    <section className={containerClass}>
      <CoverContainer>
        <Cover cover={profileCover} />
      </CoverContainer>

      <div className="content-container l-row">
        <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <section className="content">
            <div className="avatar-container">
              <Avatar
                size="xlarge"
                user={!isMe && viewer.isInactive ? undefined : user}
              />
              {!isMe && (
                <section className="buttons">
                  <FollowButton user={user} size="default" />
                  <span className="u-sm-up-hide">
                    <ShareButton />
                  </span>
                </section>
              )}
            </div>

            <section className="info">
              <header className="header">
                <section className="name">
                  {!viewer.isInactive && (
                    <span>
                      {user.displayName}
                      {hasSeedBadge && <SeedBadge />}
                      {!isMe && <FollowButton.State user={user} />}
                    </span>
                  )}
                  {viewer.isArchived && (
                    <span>
                      <Translate
                        zh_hant={TEXT.zh_hant.accountArchived}
                        zh_hans={TEXT.zh_hans.accountArchived}
                      />
                    </span>
                  )}
                  {viewer.isFrozen && (
                    <span>
                      <Translate
                        zh_hant={TEXT.zh_hant.accountFrozen}
                        zh_hans={TEXT.zh_hans.accountFrozen}
                      />
                    </span>
                  )}
                  {viewer.isBanned && (
                    <span>
                      <Translate
                        zh_hant={TEXT.zh_hant.accountBanned}
                        zh_hans={TEXT.zh_hans.accountBanned}
                      />
                    </span>
                  )}
                </section>
                <section className="buttons">
                  {isMe && !viewer.isInactive && (
                    <EditProfileButton setEditing={setEditing} />
                  )}
                  <span className={!isMe ? 'u-sm-down-hide' : ''}>
                    <ShareButton />
                  </span>
                </section>
              </header>

              {!viewer.isInactive && (
                <Description description={user.info.description} />
              )}
              <section className="info-follow">
                <Link {...userFollowersPath}>
                  <a className="followers">
                    <span className="count">
                      {numAbbr(user.followers.totalCount)}
                    </span>
                    <Translate
                      zh_hant={TEXT.zh_hant.follower}
                      zh_hans={TEXT.zh_hans.follower}
                    />
                  </a>
                </Link>
                <Link {...userFolloweesPath}>
                  <a className="followees">
                    <span className="count">
                      {numAbbr(user.followees.totalCount)}
                    </span>
                    <Translate
                      zh_hant={TEXT.zh_hant.following}
                      zh_hans={TEXT.zh_hans.following}
                    />
                  </a>
                </Link>
              </section>
            </section>
          </section>
        </section>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export const UserProfile = () => (
  <>
    <BaseUserProfile />
    <ShareModal />
  </>
)
