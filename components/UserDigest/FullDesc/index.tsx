// External modules
import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

// Internal modules
import { Avatar } from '~/components'
import { FollowButton } from '~/components/FollowButton'

import { toPath } from '~/common/utils'
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

const FullDesc = ({
  user,
  nameSize = 'default'
}: {
  user: UserDigestFullDescUser
  nameSize?: 'default' | 'small'
}) => {
  const nameSizeClasses = classNames({
    name: true,
    [nameSize]: true
  })
  const path = toPath({
    page: 'userProfile',
    userName: user.userName
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
