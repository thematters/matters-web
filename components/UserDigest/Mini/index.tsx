// External modules
import gql from 'graphql-tag'
import { SFC } from 'react'

// Internal modules
import { Avatar } from '~/components'
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
      description
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

const Mini: SFC = ({ user }: { user: any }) => (
  <section>
    <div className="container">
      <Avatar size="xxsmall" user={user} />
      <span className="name">{user.displayName}</span>
    </div>
    <style jsx>{styles}</style>
  </section>
)

Mini.fragments = fragments

export default Mini
