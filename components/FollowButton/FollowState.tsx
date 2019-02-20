import gql from 'graphql-tag'

import { Button } from '~/components'

import { FollowStateUser } from './__generated__/FollowStateUser'

const FollowState = ({ user }: { user: FollowStateUser }) => {
  if (!user.isFollower) {
    return null
  }

  return (
    <Button
      size="small"
      is="span"
      outlineColor="grey"
      style={{ borderWidth: 1, width: '4rem' }}
    >
      {user.isFollowee ? '互相追蹤' : '追蹤了你'}
    </Button>
  )
}

FollowState.fragments = {
  user: gql`
    fragment FollowStateUser on User {
      isFollower
      isFollowee
    }
  `
}

export default FollowState
