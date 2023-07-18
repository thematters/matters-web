import gql from 'graphql-tag'
import _isNil from 'lodash/isNil'

import { Button, TextIcon, toast, Translate, useMutation } from '~/components'
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

        toast.success({
          message: <Translate id="successUnblock" />,
        })
      }}
    >
      <TextIcon weight="md" size="xs">
        <Translate id="unblockUser" />
      </TextIcon>
    </Button>
  )
}

UnblockUserButton.fragments = fragments
