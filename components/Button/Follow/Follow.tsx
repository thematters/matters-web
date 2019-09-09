import gql from 'graphql-tag'

import { Button, Icon, Translate } from '~/components'
import { Mutation } from '~/components/GQL'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'
import ICON_ADD from '~/static/icons/add.svg?sprite'

import { FollowButtonUser } from './__generated__/FollowButtonUser'

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
        onClick={() => {
          follow()
          analytics.trackEvent(ANALYTICS_EVENTS.FOLLOW_USER, { id: user.id })
        }}
        bgColor="transparent"
        outlineColor="green"
      >
        <Translate
          zh_hant={TEXT.zh_hant.follow}
          zh_hans={TEXT.zh_hans.follow}
        />
      </Button>
    )}
  </Mutation>
)

export default Follow
