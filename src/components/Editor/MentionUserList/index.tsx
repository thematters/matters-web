import { DropdownUserList } from '~/components'
import { UserDigestMiniUserFragment } from '~/gql/graphql'

const MentionUserList = ({
  mentionLoading,
  mentionSelection,
  mentionUsers,
}: {
  mentionLoading?: boolean
  mentionSelection: (user: UserDigestMiniUserFragment) => void
  mentionUsers: UserDigestMiniUserFragment[]
}) => (
  <DropdownUserList
    loading={mentionLoading}
    onClick={mentionSelection}
    users={mentionUsers}
  />
)

export default MentionUserList
