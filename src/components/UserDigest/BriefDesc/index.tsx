import gql from 'graphql-tag'
import Link from 'next/link'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { UserDigestBriefDescUser } from './__generated__/UserDigestBriefDescUser'

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
  const isArchived = user?.status?.state === 'archived'

  if (isArchived) {
    return (
      <section className="container">
        <Avatar size="lg" />

        <section className="name">
          <span className="displayName">
            <Translate
              zh_hant={TEXT.zh_hant.accountArchived}
              zh_hans={TEXT.zh_hans.accountArchived}
            />
          </span>
        </section>

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <>
      <Link {...path}>
        <a>
          <section className="container">
            <Avatar size="lg" user={user} />
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
