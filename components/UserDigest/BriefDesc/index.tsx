// External modules
import gql from 'graphql-tag'
import { SFC } from 'react'

// Internal modules
import { Avatar } from '~/components'
import styles from './styles.css'

/**
 * UserDigest.BriefDesc is a component for presenting user's avatar, display name and
 * description. Description might be truncated automatically due to container size.
 *
 * Usage:
 *
 *   <UserDigest.BriefDesc user={user} />
 */

const fragments = {
  user: gql`
    fragment UserDigestBriefDescUser on User {
      description
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

const BriefDesc: SFC = ({ user }: { user: any }) => (
  <section>
    <div className="container">
      <Avatar size="xsmall" user={user} />
      <span className="name">{user.displayName}</span>
      <span className="description">{user.description}</span>
    </div>
    <style jsx>{styles}</style>
  </section>
)

BriefDesc.fragments = fragments

export default BriefDesc
