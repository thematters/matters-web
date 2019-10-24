import gql from 'graphql-tag'

import { Button, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { UnblockUser } from '~/components/GQL/mutations/__generated__/UnblockUser'
import UNBLOCK_USER from '~/components/GQL/mutations/unblockUser'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import { UnblockButtonUser } from './__generated__/UnblockButtonUser'

const fragments = {
  user: gql`
    fragment UnblockButtonUser on User {
      id
      isBlocked
    }
  `
}

const Unblock = ({
  user,
  size = 'small'
}: {
  user: UnblockButtonUser
  size?: 'small' | 'default'
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
      size={size}
      style={size === 'small' ? { width: '4rem' } : { width: '5.5rem' }}
      onClick={() => {
        unblockUser()
        analytics.trackEvent(ANALYTICS_EVENTS.UNFOLLOW_USER, {
          id: user.id
        })
      }}
      bgColor="green"
    >
      <Translate
        zh_hant={TEXT.zh_hant.unblock}
        zh_hans={TEXT.zh_hans.unblock}
      />
    </Button>
  )
}

Unblock.fragments = fragments

export default Unblock
