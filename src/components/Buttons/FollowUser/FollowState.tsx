import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Button, TextIcon } from '~/components'
import { FollowStateUserPrivateFragment } from '~/gql/graphql'

interface FollowStateProps {
  user: Partial<FollowStateUserPrivateFragment>
}

const FollowState = ({ user }: FollowStateProps) => {
  if (!user.isFollower) {
    return null
  }

  return (
    <Button
      spacing={[0, 'xtight']}
      size={[null, '1rem']}
      borderWidth="sm"
      borderColor="grey"
      is="span"
    >
      <TextIcon size="xs" color="grey" weight="md">
        {user.isFollowee ? (
          <FormattedMessage defaultMessage="Followed" description="src/components/Buttons/FollowUser/FollowState.tsx" />
        ) : (
          <FormattedMessage defaultMessage="Followed You" description="src/components/Buttons/FollowUser/FollowState.tsx" />
        )}
      </TextIcon>
    </Button>
  )
}

FollowState.fragments = {
  user: {
    private: gql`
      fragment FollowStateUserPrivate on User {
        id
        isFollower
        isFollowee
      }
    `,
  },
}

export default FollowState
