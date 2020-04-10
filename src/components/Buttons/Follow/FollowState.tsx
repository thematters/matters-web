import gql from 'graphql-tag';

import { Button, TextIcon, Translate } from '~/components';

import { FollowStateUser } from './__generated__/FollowStateUser';

const FollowState = ({ user }: { user: FollowStateUser }) => {
  if (!user.isFollower) {
    return null;
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
          <Translate id="followingYou" />
        )}
      </TextIcon>
    </Button>
  );
};

FollowState.fragments = {
  user: gql`
    fragment FollowStateUser on User {
      id
      isFollower
      isFollowee
    }
  `,
};

export default FollowState;
