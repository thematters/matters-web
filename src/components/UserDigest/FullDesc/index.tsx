import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { TextIcon, Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import UnblockButton from '~/components/Button/BlockUser/Unblock'
import { FollowButton } from '~/components/Button/Follow'
import IconLike from '~/components/Icon/Like'

import { TEXT } from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'

import { UserDigestFullDescUser } from './__generated__/UserDigestFullDescUser'
import styles from './styles.css'

/**
 * UeserDigest.FullDesc is a component for presenting user's avatar, display
 * name, description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.FullDesc user={user} />
 */

const fragments = {
  user: gql`
    fragment UserDigestFullDescUser on User {
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
      ...UnblockButtonUser
    }
    ${Avatar.fragments.user}
    ${FollowButton.State.fragments.user}
    ${FollowButton.fragments.user}
    ${UnblockButton.fragments.user}
  `
}

const appreciationIconStyle = { marginRight: '0.5rem' }

const Appreciation = ({ sum }: { sum?: number }) => {
  if (!sum) {
    return null
  }
  const abbrSum = numAbbr(sum)
  return (
    <TextIcon
      icon={<IconLike size="small" />}
      color="green"
      weight="medium"
      text={abbrSum}
      size="sm"
      spacing="xtight"
      style={appreciationIconStyle}
    />
  )
}

const FullDesc = ({
  user,
  nameSize = 'default',
  readonly,
  appreciations,
  showUnblock
}: {
  user: UserDigestFullDescUser
  nameSize?: 'default' | 'small'
  readonly?: boolean
  appreciations?: number
  showUnblock?: boolean
}) => {
  const showAppreciations = appreciations && appreciations > 0
  const nameSizeClasses = classNames({
    name: true,
    [nameSize]: true,
    'name-shrink': showAppreciations
  })
  const path = readonly
    ? { href: '' }
    : toPath({
        page: 'userProfile',
        userName: user.userName || ''
      })
  const isArchived = user?.status?.state === 'archived'

  if (isArchived) {
    return (
      <section className="container">
        <Avatar size="default" />

        <section className="content">
          <header className="header-container">
            <div className="header-left">
              <span className={nameSizeClasses}>
                <Translate
                  zh_hant={TEXT.zh_hant.accountArchived}
                  zh_hans={TEXT.zh_hans.accountArchived}
                />
              </span>
            </div>
          </header>
        </section>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="container">
      <Link {...path}>
        <a>
          <Avatar size="default" user={user} />
        </a>
      </Link>

      <section className="content">
        <header className="header-container">
          <div className="header-left">
            <Link {...path}>
              <a>
                <span className={nameSizeClasses}>{user.displayName}</span>
              </a>
            </Link>
            {showAppreciations && <Appreciation sum={appreciations} />}
            {!showUnblock && <FollowButton.State user={user} />}
          </div>

          <div className="header-right">
            {showUnblock && <UnblockButton user={user} />}
            {!showUnblock && <FollowButton user={user} />}
          </div>
        </header>

        <Link {...path}>
          <a>
            <p className="description">{user.info.description}</p>
          </a>
        </Link>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

FullDesc.fragments = fragments

export default FullDesc
