import gql from 'graphql-tag'
import _isNil from 'lodash/isNil'
import { FormattedMessage } from 'react-intl'

import { Button, useMutation } from '~/components'
import TOGGLE_BLOCK_USER from '~/components/GQL/mutations/toggleBlockUser'
import {
  ToggleBlockUserButtonUserPrivateFragment,
  ToggleBlockUserMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface ToggleBlockUserButtonProps {
  user: Partial<ToggleBlockUserButtonUserPrivateFragment>
}

const fragments = {
  user: {
    private: gql`
      fragment ToggleBlockUserButtonUserPrivate on User {
        id
        isBlocked
      }
    `,
  },
}

export const ToggleBlockUserButton = ({ user }: ToggleBlockUserButtonProps) => {
  const isBlocked = user.isBlocked

  const [toggleBlockUser] = useMutation<ToggleBlockUserMutation>(
    TOGGLE_BLOCK_USER,
    {
      variables: { id: user.id, enabled: !isBlocked },
      optimisticResponse: !_isNil(user.id)
        ? {
            toggleBlockUser: {
              id: user.id,
              isBlocked: !isBlocked,
              __typename: 'User',
            },
          }
        : undefined,
    }
  )

  return (
    <Button onClick={async () => toggleBlockUser()}>
      <span className={styles.unblockButton}>
        {isBlocked ? (
          <FormattedMessage
            defaultMessage="Unblock"
            description="src/views/Me/Settings/Blocked/ToggleBlockButton.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Unblocked"
            description="src/views/Me/Settings/Blocked/ToggleBlockButton.tsx"
          />
        )}
      </span>
    </Button>
  )
}

ToggleBlockUserButton.fragments = fragments
