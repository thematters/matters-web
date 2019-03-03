import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { Avatar } from '~/components/Avatar'
import { FollowButton } from '~/components/Button/Follow'
import { Error } from '~/components/Error'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Placeholder } from '~/components/Placeholder'
import { TextIcon } from '~/components/TextIcon'
import { UserProfileEditor } from '~/components/UserProfileEditor'
import { ViewerContext } from '~/components/Viewer'

import { getQuery, toPath } from '~/common/utils'
import ICON_SETTINGS from '~/static/icons/settings.svg?sprite'

import { UserProfileUser } from './__generated__/UserProfileUser'
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

const EditProfileButton = ({
  setEditing
}: {
  setEditing: (value: boolean) => void
}) => (
  <button type="button" onClick={() => setEditing(true)}>
    <TextIcon
      icon={
        <Icon
          id={ICON_SETTINGS.id}
          viewBox={ICON_SETTINGS.viewBox}
          size="small"
        />
      }
      color="grey"
    >
      <Translate zh_hant="編輯資料" zh_hans="编辑资料" />
    </TextIcon>
  </button>
)

const BaseUserProfile: React.FC<WithRouterProps> = ({ router }) => {
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' })
  const isMe = !userName || viewer.userName === userName
  const [editing, setEditing] = useState<boolean>(false)
  const containerClass = classNames('container', editing ? 'editing' : '')

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

              if (error) {
                return <Error error={error} />
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

              return (
                <section className="content">
                  <Avatar size="xlarge" user={user} />

                  <section className="info">
                    <header className="header">
                      <section className="name">
                        <span>{user.displayName}</span>
                        {!isMe && <FollowButton.State user={user} />}
                      </section>
                      <section className="action-button">
                        {isMe ? (
                          <EditProfileButton setEditing={setEditing} />
                        ) : (
                          <FollowButton user={user} size="default" />
                        )}
                      </section>
                    </header>

                    <p className="description">{user.info.description}</p>

                    <section className="info-follow">
                      <Link {...userFollowersPath}>
                        <a className="followers">
                          <span className="count">
                            {user.followers.totalCount}
                          </span>
                          <Translate
                            {...(isMe
                              ? { zh_hant: '追蹤我的', zh_hans: '追踪我的' }
                              : { zh_hant: '追蹤者', zh_hans: '追踪者' })}
                          />
                        </a>
                      </Link>
                      <Link {...userFolloweesPath}>
                        <a className="followees">
                          <span className="count">
                            {user.followees.totalCount}
                          </span>
                          <Translate
                            {...(isMe
                              ? { zh_hant: '我追蹤的', zh_hans: '我追踪的' }
                              : { zh_hant: '追蹤中', zh_hans: '追踪中' })}
                          />
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
