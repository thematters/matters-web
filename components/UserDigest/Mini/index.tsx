// External modules
import gql from 'graphql-tag'
import Link from 'next/link'

// Internal modules
import { Avatar } from '~/components'

import { toPath } from '~/common/utils'
import { UserDigestMiniUser } from './__generated__/UserDigestMiniUser'
import styles from './styles.css'

/**
 * UserDigest.Mini is a component for presenting user's avatar and display name.
 *
 * Usage:
 *
 *   <UserDigest.Mini user={user} />
 */

const fragments = {
  user: gql`
    fragment UserDigestMiniUser on User {
      userName
      displayName
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

const Mini = ({ user }: { user: UserDigestMiniUser }) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName
  })

  return (
    <>
      <section>
        <Link href={path.fs} as={path.url}>
          <a className="container">
            <Avatar size="xxsmall" user={user} />
            <span className="name">{user.displayName}</span>
          </a>
        </Link>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}

Mini.fragments = fragments

export default Mini
