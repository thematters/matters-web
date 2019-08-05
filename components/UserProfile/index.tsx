import classNames from 'classnames'
import gql from 'graphql-tag'
import { get, some } from 'lodash'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useState } from 'react'
import { QueryResult } from 'react-apollo'

import { Avatar, Placeholder, Tooltip, Translate } from '~/components'
import { FollowButton } from '~/components/Button/Follow'
import { Query } from '~/components/GQL'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'
import { UserProfileEditor } from '~/components/UserProfileEditor'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { getQuery, numAbbr, toPath } from '~/common/utils'
import ICON_SEED_BADGE from '~/static/icons/eerly-user-badge.svg?sprite'
import ICON_LOCK from '~/static/icons/lock.svg?sprite'

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

const OnboardingBadge = () => (
  <span>
    <TextIcon
      color="grey"
      icon={
        <Icon
          id={ICON_LOCK.id}
          viewBox={ICON_LOCK.viewBox}
          style={{ width: 16, height: 16 }}
        />
      }
    >
      <Translate zh_hant="還不是創作者" zh_hans="还不是创作者" />
    </TextIcon>
  </span>
)

const CoverContainer = ({ children }: any) => (
  <>
    <div className="cover-container l-row">
      <section className="l-col-4 l-col-md-8 l-col-lg-12">{children}</section>
    </div>
    <style jsx>{styles}</style>
  </>
)

type UserProfileResultType = QueryResult & { data: UserProfileUser }

const BaseUserProfile: React.FC<WithRouterProps> = ({ router }) => {
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' })
  const isMe = !userName || viewer.userName === userName
  const [editing, setEditing] = useState<boolean>(false)

  const containerClass = classNames({
    container: true,
    editing,
    inactive: isMe && viewer.isInactive
  })

  return (
    <section className={containerClass}>
      <Query
        query={isMe ? ME_PROFILE : USER_PROFILE}
        variables={isMe ? {} : { userName }}
      >
        {({ data, loading, error }: UserProfileResultType) => {
          if (loading) {
            return (
              <CoverContainer>
                <Placeholder.UserProfile />
              </CoverContainer>
            )
          }

          if (isMe && editing) {
            return (
              <UserProfileEditor user={data.viewer} saveCallback={setEditing} />
            )
          }

          const user = isMe ? data.viewer : data.user
          const userFollowersPath = toPath({
            page: 'userFollowers',
            userName: user.userName
          })
          const userFolloweesPath = toPath({
            page: 'userFollowees',
            userName: user.userName
          })
          const badges = get(user, 'info.badges', [])
          const hasSeedBadge = some(badges, { type: 'seed' })
          const state = get(user, 'status.state')
          const isOnboarding = state === 'onboarding'
          const profileCover = get(user, 'info.profileCover', '')

          return (
            <>
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
                      <section className="action-button">
                        {!isMe && <FollowButton user={user} size="default" />}
                      </section>
                    </div>

                    <section className="info">
                      <header className="header">
                        <section className="name">
                          {!viewer.isInactive && (
                            <span>
                              {user.displayName}
                              {hasSeedBadge && <SeedBadge />}
                              {isOnboarding && <OnboardingBadge />}
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
                        <section className="action-button">
                          {isMe && !viewer.isInactive && (
                            <EditProfileButton setEditing={setEditing} />
                          )}
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
            </>
          )
        }}
      </Query>

      <style jsx>{styles}</style>
    </section>
  )
}

export const UserProfile = withRouter(BaseUserProfile)
