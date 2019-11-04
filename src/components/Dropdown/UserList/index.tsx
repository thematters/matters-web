import { Menu } from '~/components/Menu'
import { Spinner } from '~/components/Spinner'
import { UserDigest } from '~/components/UserDigest'
import { UserDigestBriefDescUser } from '~/components/UserDigest/BriefDesc/__generated__/UserDigestBriefDescUser'

import styles from './styles.css'

/**
 * This will be deprecated.
 *
 */

const DropdownUserList = ({
  users,
  onClick,
  loading
}: {
  users: UserDigestBriefDescUser[]
  onClick: (user: UserDigestBriefDescUser) => void
  loading?: boolean
}) => {
  if (loading) {
    return (
      <Menu width="md">
        <Menu.Item>
          <Spinner />
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <>
      <Menu width="md">
        {users.map(user => (
          <Menu.Item
            spacing={['xtight', 'tight']}
            hoverBgColor="green"
            key={user.id}
          >
            <button
              className="search-user-item"
              type="button"
              onClick={() => {
                onClick(user)
              }}
            >
              <UserDigest.BriefDesc user={user} />
            </button>
          </Menu.Item>
        ))}
      </Menu>

      <style jsx>{styles}</style>
    </>
  )
}

export default DropdownUserList
