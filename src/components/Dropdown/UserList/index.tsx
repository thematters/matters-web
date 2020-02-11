import { Menu } from '~/components/Menu'
import { Spinner } from '~/components/Spinner'
import { UserDigest } from '~/components/UserDigest'

import { UserDigestMiniUser } from '~/components/UserDigest/Mini/__generated__/UserDigestMiniUser'

const DropdownUserList = ({
  users,
  onClick,
  loading
}: {
  users: UserDigestMiniUser[]
  onClick: (user: UserDigestMiniUser) => void
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
    <Menu width="md">
      {users.map(user => (
        <Menu.Item
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
  )
}

export default DropdownUserList
