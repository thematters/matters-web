import { Menu } from '~/components/Menu'
import { Spinner } from '~/components/Spinner'
import { UserDigest } from '~/components/UserDigest'
import { UserDigestBriefDescUser } from '~/components/UserDigest/BriefDesc/__generated__/UserDigestBriefDescUser'

import styles from './styles.css'

const DropdownUserList = ({
  users,
  onClick,
  hideDropdown,
  loading
}: {
  users: UserDigestBriefDescUser[]
  onClick: (user: UserDigestBriefDescUser) => void
  hideDropdown: () => void
  loading?: boolean
}) => {
  if (loading) {
    return (
      <Menu width="100%">
        <Menu.Item>
          <Spinner />
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <>
      <Menu width="100%">
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
                hideDropdown()
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
