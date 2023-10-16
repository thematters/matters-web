import { forwardRef } from 'react'

import { Menu, Spinner, UserDigest } from '~/components'
import { UserDigestMiniUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'

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
        <section className={styles.mention}>
          <Menu width="md">
            <Menu.Item>
              <Spinner />
            </Menu.Item>
          </Menu>
        </section>
      )
    }

    if (!users.length || users.length === 0) {
      return null
    }

    return (
      <section className={styles.mention}>
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
      </section>
    )
  }
)

MentionList.displayName = 'MentionList'
