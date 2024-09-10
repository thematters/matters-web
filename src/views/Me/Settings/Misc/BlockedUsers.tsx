import { useQuery } from '@apollo/client'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Spinner, TableView } from '~/components'
import { ViewerBlockedUsersQuery } from '~/gql/graphql'

import { VIEWER_BLOCKED_USERS } from './gql'

const BlockedUsers = () => {
  const { data, loading } = useQuery<ViewerBlockedUsersQuery>(
    VIEWER_BLOCKED_USERS,
    { fetchPolicy: 'network-only' }
  )

  return (
    <TableView.Cell
      role="link"
      title={
        <FormattedMessage
          defaultMessage="Blocked Users"
          id="hASeng"
          description="src/views/Me/Settings/Misc/BlockedUsers.tsx"
        />
      }
      rightText={loading ? undefined : data?.viewer?.blockList.totalCount}
      rightIcon={loading ? <Spinner color="greyDarker" size={20} /> : undefined}
      href={PATHS.ME_SETTINGS_BLOCKED}
    />
  )
}

export default BlockedUsers
