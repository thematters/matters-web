import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Button, Icon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import { FollowButtonUser } from './__generated__/FollowButtonUser'
import { FollowUser } from './__generated__/FollowUser'

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
  size = 'sm'
}: {
  user: FollowButtonUser
  size?: 'sm' | 'default'
}) => {
  const [follow] = useMutation<FollowUser>(FOLLOW_USER, {
    variables: { id: user.id },
    optimisticResponse: {
      followUser: {
        id: user.id,
        isFollowee: true,
        isFollower: user.isFollower,
        __typename: 'User'
      }
    },
    update: cache => {
      const userName = _get(user, 'userName', null)
      updateUserFollowerCount({ cache, type: 'increment', userName })
      updateViewerFolloweeCount({ cache, type: 'increment' })
    }
  })

  return (
    <Button
      size={size}
      icon={
        <Icon.Add
          style={
            size === 'sm'
              ? { width: 10, height: 10 }
              : { width: 12, height: 12 }
          }
        />
      }
      style={size === 'sm' ? { width: '4rem' } : { width: '5.5rem' }}
      onClick={() => {
        follow()
        analytics.trackEvent(ANALYTICS_EVENTS.FOLLOW_USER, { id: user.id })
      }}
      bgColor="transparent"
      outlineColor="green"
    >
      <Translate zh_hant={TEXT.zh_hant.follow} zh_hans={TEXT.zh_hans.follow} />
    </Button>
  )
}

export default Follow
