import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Form, IconSpinner22 } from '~/components'
import { ViewerBlockedUsersQuery } from '~/gql/graphql'

const VIEWER_BLOCKED_USERS = gql`
  query ViewerBlockedUsers {
    viewer {
      id
      blockList(input: { first: 0 }) {
        totalCount
      }
    }
  }
`

const BlockedUsers = () => {
  const { data, loading } =
    useQuery<ViewerBlockedUsersQuery>(VIEWER_BLOCKED_USERS)

  return (
    <Form.List.Item
      role="link"
      title={
        <FormattedMessage
          defaultMessage="Blocked Users"
          description="src/views/Me/Settings/Misc/BlockedUsers.tsx"
        />
      }
      rightText={data?.viewer?.blockList.totalCount}
      rightIcon={
        loading ? <IconSpinner22 size="mdS" color="greyDarker" /> : undefined
      }
      href={PATHS.ME_SETTINGS_BLOCKED}
    />
  )
}

export default BlockedUsers
