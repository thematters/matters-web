import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Icon, TextIcon } from '~/components'
import { Avatar } from '~/components/Avatar'
import { FollowButton } from '~/components/Button/Follow'

import { numAbbr, toPath } from '~/common/utils'
import ICON_LIKE from '~/static/icons/like.svg?sprite'

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

const LikeIcon = () => (
  <Icon size="small" id={ICON_LIKE.id} viewBox={ICON_LIKE.viewBox} />
)

const appreciationIconStyle = { marginRight: '0.5rem' }

const Appreciation = ({ sum }: { sum?: number }) => {
  if (!sum) {
    return null
  }
  const abbrSum = numAbbr(sum)
  return (
    <TextIcon
      icon={<LikeIcon />}
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
  appreciations
}: {
  user: UserDigestFullDescUser
  nameSize?: 'default' | 'small'
  readonly?: boolean
  appreciations?: number
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

  return (
    <>
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
              <FollowButton.State user={user} />
            </div>

            <div className="header-right">
              <FollowButton user={user} />
            </div>
          </header>

          <Link {...path}>
            <a>
              <p className="description">{user.info.description}</p>
            </a>
          </Link>
        </section>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}

FullDesc.fragments = {
  user: gql`
    fragment UserDigestFullDescUser on User {
      id
      userName
      displayName
      info {
        description
      }
      ...AvatarUser
      ...FollowStateUser
      ...FollowButtonUser
    }
    ${Avatar.fragments.user}
    ${FollowButton.State.fragments.user}
    ${FollowButton.fragments.user}
  `
}

export default FullDesc
