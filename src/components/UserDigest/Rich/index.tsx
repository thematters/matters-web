import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Card, Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import { UnblockUserButton } from '~/components/Buttons/BlockUser'
import { FollowButton } from '~/components/Buttons/Follow'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { UserDigestRichUser } from './__generated__/UserDigestRichUser'

/**
 * UeserDigest.Rich is a component for presenting user's avatar, display
 * name, description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.Rich user={user} />
 */

interface RichProps {
  user: UserDigestRichUser

  size?: 'sm' | 'lg'
  avatarBadge?: React.ReactNode

  hasFollow?: boolean
  hasState?: boolean
  hasUnblock?: boolean

  onClick?: () => any
}

const fragments = {
  user: gql`
    fragment UserDigestRichUser on User {
      id
      userName
      displayName
      info {
        description
      }
      status {
        state
      }
      ...AvatarUser
      ...FollowStateUser
      ...FollowButtonUser
      ...UnblockUserButtonUser
    }
    ${Avatar.fragments.user}
    ${FollowButton.State.fragments.user}
    ${FollowButton.fragments.user}
    ${UnblockUserButton.fragments.user}
  `
}

const Rich = ({
  user,

  size = 'lg',
  avatarBadge,

  hasFollow,
  hasState = true,
  hasUnblock,

  onClick
}: RichProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || ''
  })
  const containerClass = classNames({
    container: true,
    [`size-${size}`]: !!size
  })
  const isArchived = user?.status?.state === 'archived'

  if (isArchived) {
    return (
      <Card spacing={['tight', 0]} onClick={onClick}>
        <section className={containerClass}>
          <span className="avatar">
            <Avatar size={size === 'sm' ? 'lg' : 'xl'} />
          </span>

          <section className="content">
            <header>
              <span className="name">
                <Translate
                  zh_hant={TEXT.zh_hant.accountArchived}
                  zh_hans={TEXT.zh_hans.accountArchived}
                />
              </span>
            </header>
          </section>

          <style jsx>{styles}</style>
        </section>
      </Card>
    )
  }

  return (
    <Card {...path} spacing={['tight', 0]} onClick={onClick}>
      <section className={containerClass}>
        <Link {...path}>
          <a className="avatar">
            <Avatar size={size === 'sm' ? 'lg' : 'xl'} user={user} />
            {avatarBadge && <span className="badge">{avatarBadge}</span>}
          </a>
        </Link>

        <section className="content">
          <header>
            <Link {...path}>
              <a className="name">{user.displayName}</a>
            </Link>
            {hasState && <FollowButton.State user={user} />}
          </header>

          {user.info.description && (
            <p className="description">{user.info.description}</p>
          )}
        </section>

        <section className="extra-button">
          {hasUnblock && <UnblockUserButton user={user} />}
          {hasFollow && <FollowButton user={user} />}
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

Rich.fragments = fragments

export default Rich
