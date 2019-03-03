import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import ICON_ADD from '~/static/icons/add.svg?sprite'

import { FollowButtonUser } from './__generated__/FollowButtonUser'
import { updateViewerFolloweeCount } from './utils'

const FOLLOW_USER = gql`
  mutation FollowUser($id: ID!) {
    followUser(input: { id: $id }) {
      id
      isFollowee
      isFollower
    }
  }
`

const Follow = ({
  user,
  size = 'small'
}: {
  user: FollowButtonUser
  size?: 'small' | 'default'
}) => (
  <Mutation
    mutation={FOLLOW_USER}
    variables={{ id: user.id }}
    optimisticResponse={{
      followUser: {
        id: user.id,
        isFollowee: true,
        isFollower: user.isFollower,
        __typename: 'User'
      }
    }}
    update={cache => {
      updateViewerFolloweeCount({ cache, type: 'increment' })
    }}
  >
    {(follow, { data }) => (
      <Button
        size={size}
        icon={
          <Icon
            id={ICON_ADD.id}
            viewBox={ICON_ADD.viewBox}
            style={
              size === 'small'
                ? { width: 10, height: 10 }
                : { width: 12, height: 12 }
            }
          />
        }
        style={size === 'small' ? { width: '4rem' } : { width: '5.5rem' }}
        onClick={follow}
        bgColor="transparent"
        outlineColor="green"
      >
        <Translate zh_hant="追蹤" zh_hans="追踪" />
      </Button>
    )}
  </Mutation>
)

export default Follow
