import UserList from '~/components/Dropdown/UserList'
import { UserDigestBriefDescUser } from '~/components/UserDigest/BriefDesc/__generated__/UserDigestBriefDescUser'

const MentionUserList = ({
  mentionLoading,
  mentionSelection,
  mentionUsers
}: {
  mentionLoading?: boolean
  mentionSelection: (user: UserDigestBriefDescUser) => void
  mentionUsers: UserDigestBriefDescUser[]
}) => (
  <UserList
    loading={mentionLoading}
    onClick={mentionSelection}
    users={mentionUsers}
  />
)

export default MentionUserList
