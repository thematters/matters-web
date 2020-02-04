import gql from 'graphql-tag'

import { Button, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import { FollowStateUser } from './__generated__/FollowStateUser'

const FollowState = ({ user }: { user: FollowStateUser }) => {
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
      </TextIcon>
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
