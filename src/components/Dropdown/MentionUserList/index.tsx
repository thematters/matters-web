import { Menu } from '~/components/Menu'
import { Spinner } from '~/components/Spinner'
import { UserDigest } from '~/components/UserDigest'
import { UserDigestBriefDescUser } from '~/components/UserDigest/BriefDesc/__generated__/UserDigestBriefDescUser'

import styles from './styles.css'

const MentionUserList = ({
  mentionLoading,
  mentionSelection,
  mentionUsers
}: {
  mentionLoading?: boolean
  mentionSelection: (user: UserDigestBriefDescUser) => void
  mentionUsers: UserDigestBriefDescUser[]
}) => {
  if (mentionLoading) {
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
        {mentionUsers.map(user => (
          <Menu.Item
            spacing={['xtight', 'tight']}
            hoverBgColor="green"
            key={user.id}
          >
            <button
              className="search-user-item"
              type="button"
              onClick={() => mentionSelection(user)}
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

export default MentionUserList
