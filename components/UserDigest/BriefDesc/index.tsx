// External modules
import gql from 'graphql-tag'

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

interface BerifDescProps {
  user: any
}

const fragments = {
  user: gql`
    fragment UserDigestBriefDescUser on User {
      info {
        description
      }
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

const BriefDesc: React.FC<BerifDescProps> & { fragments: typeof fragments } = ({
  user
}) => (
  <section>
    <div className="container">
      <Avatar size="xsmall" user={user} />
      <span className="name">{user.displayName}</span>
      <span className="description">{user.info.description}</span>
    </div>
    <style jsx>{styles}</style>
  </section>
)

BriefDesc.fragments = fragments

export default BriefDesc
