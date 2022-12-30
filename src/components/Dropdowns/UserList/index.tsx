import { Menu, Spinner, UserDigest } from '~/components'
import { UserDigestMiniUserFragment } from '~/gql/graphql'

export const DropdownUserList = ({
  users,
  onClick,
  loading,
}: {
  users: UserDigestMiniUserFragment[]
  onClick: (user: UserDigestMiniUserFragment) => void
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
  )
}
