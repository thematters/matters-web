import gql from 'graphql-tag'

import { Button, TextIcon, Translate } from '~/components'

import { FollowStateUserPrivate } from './__generated__/FollowStateUserPrivate'

interface FollowStateProps {
  user: Partial<FollowStateUserPrivate>
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
