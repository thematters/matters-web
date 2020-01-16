import gql from 'graphql-tag'

import { Button, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import { FollowStateUser } from './__generated__/FollowStateUser'

const FollowState = ({ user }: { user: FollowStateUser }) => {
  if (!user.isFollower) {
    return null
  }

  return (
    <Button
      size="sm"
      is="span"
      bgColor="transparent"
      outlineColor="grey"
      style={{
        borderWidth: 1,
        height: 16,
        width: 52,
        fontSize: 9,
        fontWeight: 600
      }}
    >
      {user.isFollowee ? (
        <Translate
          zh_hant={TEXT.zh_hant.mutualFollowing}
          zh_hans={TEXT.zh_hans.mutualFollowing}
        />
      ) : (
        <Translate
          zh_hant={TEXT.zh_hant.followingYou}
          zh_hans={TEXT.zh_hans.followingYou}
        />
      )}
    </Button>
  )
}

FollowState.fragments = {
  user: gql`
    fragment FollowStateUser on User {
      id
      isFollower
      isFollowee
    }
  `
}

export default FollowState
