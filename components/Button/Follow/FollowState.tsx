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
      size="small"
      is="span"
      bgColor="transparent"
      outlineColor="grey"
      style={{ borderWidth: 1, width: '4rem', height: 20 }}
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
      userName
      isFollower
      isFollowee
    }
  `
}

export default FollowState
