import gql from 'graphql-tag'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { Avatar, Error, Icon, TextIcon, Translate } from '~/components'
import { FollowButton } from '~/components/Button/Follow'
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

const EditProfileButton = () => (
  <button type="button" onClick={() => alert('TODO: Edit Profile')}>
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

const BaseUserProfile: React.FC<WithRouterProps & { type?: 'me' }> = ({
  router,
  type
}) => {
  const viewer = useContext(ViewerContext)
  const userName = getQuery({ router, key: 'userName' })

  return (
    <section className="container">
      <div className="l-row">
        <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2 content">
          <Query
            query={type === 'me' ? ME_PROFILE : USER_PROFILE}
            variables={type === 'me' ? {} : { userName }}
          >
            {({
              data,
              loading,
              error
            }: QueryResult & { data: UserProfileUser }) => {
              if (loading) {
                return (
                  <section className="content">
                    <Avatar size="xlarge" />
                  </section>
                )
              }

              if (error) {
                return <Error error={error} />
              }

              const user = type === 'me' ? data.viewer : data.user
              const isMe = type === 'me' || viewer.id === user.id
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
                          <EditProfileButton />
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
                          <Translate zh_hant="關注我的" zh_hans="关注我的" />
                        </a>
                      </Link>
                      <Link {...userFolloweesPath}>
                        <a className="followees">
                          <span className="count">
                            {user.followees.totalCount}
                          </span>
                          <Translate zh_hant="我關注的" zh_hans="我关注的" />
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
