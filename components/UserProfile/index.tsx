import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useState } from 'react'
import { QueryResult } from 'react-apollo'

import { Avatar, Placeholder, Translate } from '~/components'
import { FollowButton } from '~/components/Button/Follow'
import { Query } from '~/components/GQL'
import { UserProfileEditor } from '~/components/UserProfileEditor'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { getQuery, numAbbr, toPath } from '~/common/utils'

import { UserProfileUser } from './__generated__/UserProfileUser'
import EditProfileButton from './EditProfileButton'
import styles from './styles.css'

const fragments = {
  user: gql`
    fragment ProfileUser on User {
      id
      userName
      displayName
      info {
        description
      }
      followees(input: { first: 0 }) {
        totalCount
      }
      followers(input: { first: 0 }) {
        totalCount
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
      <div className="content-container l-row">
        <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <Query
            query={isMe ? ME_PROFILE : USER_PROFILE}
            variables={isMe ? {} : { userName }}
          >
            {({
              data,
              loading,
              error
            }: QueryResult & { data: UserProfileUser }) => {
              if (loading) {
                return <Placeholder.UserProfile />
              }

              if (isMe && editing) {
                return (
                  <UserProfileEditor
                    user={data.viewer}
                    saveCallback={setEditing}
                  />
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

              // me profile
              if (isMe) {
                return (
                  <section className="content">
                    <Avatar
                      size="xlarge"
                      user={viewer.isInactive ? undefined : user}
                    />

                    <section className="info">
                      <header className="header">
                        <section className="name">
                          {!viewer.isInactive && (
                            <span>{user.displayName}</span>
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
                          {!viewer.isInactive && (
                            <EditProfileButton setEditing={setEditing} />
                          )}
                        </section>
                      </header>

                      {!viewer.isInactive && (
                        <p className="description">{user.info.description}</p>
                      )}

                      <section className="info-follow">
                        <Link {...userFollowersPath}>
                          <a className="followers">
                            <span className="count">
                              {numAbbr(user.followers.totalCount)}
                            </span>
                            <Translate zh_hant="追蹤我的" zh_hans="追踪我的" />
                          </a>
                        </Link>
                        <Link {...userFolloweesPath}>
                          <a className="followees">
                            <span className="count">
                              {numAbbr(user.followees.totalCount)}
                            </span>
                            <Translate zh_hant="我追蹤的" zh_hans="我追踪的" />
                          </a>
                        </Link>
                      </section>
                    </section>
                  </section>
                )
              }

              // other's profile
              return (
                <section className="content">
                  <Avatar size="xlarge" user={user} />

                  <section className="info">
                    <header className="header">
                      <section className="name">
                        <span>{user.displayName}</span>
                        <FollowButton.State user={user} />
                      </section>

                      <section className="action-button">
                        <FollowButton user={user} size="default" />
                      </section>
                    </header>

                    <p className="description">{user.info.description}</p>

                    <section className="info-follow">
                      <Link {...userFollowersPath}>
                        <a className="followers">
                          <span className="count">
                            {numAbbr(user.followers.totalCount)}
                          </span>
                          <Translate zh_hant="追蹤者" zh_hans="追踪者" />
                        </a>
                      </Link>
                      <Link {...userFolloweesPath}>
                        <a className="followees">
                          <span className="count">
                            {numAbbr(user.followees.totalCount)}
                          </span>
                          <Translate zh_hant="追蹤中" zh_hans="追踪中" />
                        </a>
                      </Link>
                    </section>
                  </section>
                </section>
              )
            }}
          </Query>
        </section>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export const UserProfile = withRouter(BaseUserProfile)
