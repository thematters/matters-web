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
      spacing={[0, 8]}
      size={[null, '1rem']}
      borderWidth="sm"
      borderColor="grey"
      is="span"
    >
      <TextIcon size={12} color="grey" weight="medium">
        {user.isFollowee ? (
          <FormattedMessage
            defaultMessage="Followed"
            id="erE5/4"
            description="src/components/Buttons/FollowUser/FollowState.tsx"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Followed You"
            id="icdrwy"
            description="src/components/Buttons/FollowUser/FollowState.tsx"
          />
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
