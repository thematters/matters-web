import gql from 'graphql-tag'
import Link from 'next/link'

import { Avatar } from '~/components/Avatar'

import { toPath } from '~/common/utils'

import { UserDigestBriefDescUser } from './__generated__/UserDigestBriefDescUser'
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
    }
    ${Avatar.fragments.user}
  `
}

const BriefDesc = ({ user }: { user: UserDigestBriefDescUser }) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || ''
  })

  return (
    <>
      <Link {...path}>
        <a>
          <section className="container">
            <Avatar size="small" user={user} />
            <section className="name">
              <span className="displayName">{user.displayName}</span>
              <span className="userName">@{user.userName}</span>
            </section>
            {/* <span className="description">{user.info.description}</span> */}
          </section>
        </a>
      </Link>

      <style jsx>{styles}</style>
    </>
  )
}

BriefDesc.fragments = fragments

export default BriefDesc
