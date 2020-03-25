import gql from 'graphql-tag'
import _get from 'lodash/get'

import {
  Button,
  ButtonHeight,
  ButtonWidth,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { FollowButtonSize } from './index'

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
  size,
}: {
  user: FollowButtonUser
  size: FollowButtonSize
}) => {
  const [follow] = useMutation<FollowUser>(FOLLOW_USER, {
    variables: { id: user.id },
    optimisticResponse: {
      followUser: {
        id: user.id,
        isFollowee: true,
        isFollower: user.isFollower,
        __typename: 'User',
      },
    },
    update: (cache) => {
      const userName = _get(user, 'userName', null)
      updateUserFollowerCount({ cache, type: 'increment', userName })
      updateViewerFolloweeCount({ cache, type: 'increment' })
    },
  })

  const sizes: Record<FollowButtonSize, [ButtonWidth, ButtonHeight]> = {
    lg: ['6rem', '2rem'],
    md: ['4rem', '1.5rem'],
    'md-s': ['3rem', '1.5rem'],
  }

  return (
    <Button
      size={sizes[size]}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={() => {
        follow()
        analytics.trackEvent(ANALYTICS_EVENTS.FOLLOW_USER, { id: user.id })
      }}
    >
      <TextIcon weight="md" size={size === 'lg' ? 'sm' : 'xs'}>
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
