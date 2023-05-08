import { forwardRef } from 'react'

import { Menu, Spinner, UserDigest } from '~/components'
import { UserDigestMiniUserFragment } from '~/gql/graphql'

import styles from './styles.css'

export const MentionList = forwardRef(
  (
    {
      users,
      onClick,
      loading,
    }: {
      users: UserDigestMiniUserFragment[]
      onClick: (user: UserDigestMiniUserFragment) => void
      loading?: boolean
    },
    ref
  ) => {
    if (loading) {
      return (
        <section className="mention">
          <Menu width="md">
            <Menu.Item>
              <Spinner />
            </Menu.Item>
          </Menu>

          <style jsx>{styles}</style>
        </section>
      )
    }

    if (!users.length || users.length === 0) {
      return null
    }

    return (
      <section className="mention">
        <Menu width="md">
          {users.map((user) => (
            <Menu.Item
              spacing={['xtight', 'base']}
              onClick={() => {
                onClick(user)
              }}
              key={user.id}
            >
              <UserDigest.Mini
                user={user}
                direction="column"
                hasAvatar
                hasDisplayName
                hasUserName
                disabled
              />
            </Menu.Item>
          ))}
        </Menu>

        <style jsx>{styles}</style>
      </section>
    )
  }
)

MentionList.displayName = 'MentionList'
