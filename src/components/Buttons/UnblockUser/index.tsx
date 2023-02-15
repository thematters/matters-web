import gql from 'graphql-tag'
import _isNil from 'lodash/isNil'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { Button, TextIcon, useMutation } from '~/components'
import TOGGLE_BLOCK_USER from '~/components/GQL/mutations/toggleBlockUser'
import {
  ToggleBlockUserMutation,
  UnblockUserButtonUserPrivateFragment,
} from '~/gql/graphql'

interface UnblockUserButtonProps {
  user: Partial<UnblockUserButtonUserPrivateFragment>
}

const fragments = {
  user: {
    private: gql`
      fragment UnblockUserButtonUserPrivate on User {
        id
        isBlocked
      }
    `,
  },
}

export const UnblockUserButton = ({ user }: UnblockUserButtonProps) => {
  const [unblockUser] = useMutation<ToggleBlockUserMutation>(
    TOGGLE_BLOCK_USER,
    {
      variables: { id: user.id, enabled: false },
      optimisticResponse: !_isNil(user.id)
        ? {
          toggleBlockUser: {
            id: user.id,
            isBlocked: false,
            __typename: 'User',
          },
        }
        : undefined,
    }
  )

  return (
    <Button
      size={['4rem', '1.5rem']}
      textColor="red"
      textActiveColor="white"
      bgActiveColor="red"
      borderColor="red"
      onClick={async () => {
        await unblockUser()
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <FormattedMessage defaultMessage="User unblocked. User can now comment on your articles." description="src/components/Buttons/UnblockUser/index.tsx" />,
            },
          })
        )
      }}
    >
      <TextIcon weight="md" size="xs">
        <FormattedMessage defaultMessage="Unblock User" description="Unblock User button" />
      </TextIcon>
    </Button>
  )
}

UnblockUserButton.fragments = fragments
