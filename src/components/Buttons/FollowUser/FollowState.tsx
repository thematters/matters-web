import gql from 'graphql-tag'

import { Button, TextIcon, Translate } from '~/components'
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
          <Translate id="mutualFollowing" />
        ) : (
          <Translate zh_hant="追蹤了你" zh_hans="追踪了你" en="Followed You" />
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
