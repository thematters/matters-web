import { DropdownUserList } from '~/components'

import { UserDigestMiniUser } from '~/components/UserDigest/Mini/__generated__/UserDigestMiniUser'

const MentionUserList = ({
  mentionLoading,
  mentionSelection,
  mentionUsers,
}: {
  mentionLoading?: boolean
  mentionSelection: (user: UserDigestMiniUser) => void
  mentionUsers: UserDigestMiniUser[]
}) => (
  <DropdownUserList
    loading={mentionLoading}
    onClick={mentionSelection}
    users={mentionUsers}
  />
)

export default MentionUserList
