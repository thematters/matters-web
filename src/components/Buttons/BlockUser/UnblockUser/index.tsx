import gql from 'graphql-tag'

import { Button, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import UNBLOCK_USER from '~/components/GQL/mutations/unblockUser'

import { ADD_TOAST, TEXT } from '~/common/enums'

import { UnblockUser } from '~/components/GQL/mutations/__generated__/UnblockUser'
import { UnblockUserButtonUser } from './__generated__/UnblockUserButtonUser'

const fragments = {
  user: gql`
    fragment UnblockUserButtonUser on User {
      id
      isBlocked
    }
  `
}

export const UnblockUserButton = ({
  user
}: {
  user: UnblockUserButtonUser
}) => {
  const [unblockUser] = useMutation<UnblockUser>(UNBLOCK_USER, {
    variables: { id: user.id },
    optimisticResponse: {
      unblockUser: {
        id: user.id,
        isBlocked: false,
        __typename: 'User'
      }
    }
  })

  return (
    <Button
      size={['4rem', '1.5rem']}
      textColor="red"
      textHoverColor="white"
      bgHoverColor="red"
      borderColor="red"
      onClick={async () => {
        await unblockUser()
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant={TEXT.zh_hant.successUnBlock}
                  zh_hans={TEXT.zh_hans.successUnBlock}
                />
              )
            }
          })
        )
      }}
    >
      <TextIcon weight="md" size="xs">
        <Translate
          zh_hant={TEXT.zh_hant.unblockUser}
          zh_hans={TEXT.zh_hans.unblockUser}
        />
      </TextIcon>
    </Button>
  )
}

UnblockUserButton.fragments = fragments
