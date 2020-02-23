import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Button, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { ANALYTICS_EVENTS } from '~/common/enums'
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
  isLarge
}: {
  user: FollowButtonUser
  isLarge?: boolean
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
      size={isLarge ? ['6rem', '2rem'] : ['4rem', '1.5rem']}
      textColor="green"
      textHoverColor="white"
      bgHoverColor="green"
      borderColor="green"
      onClick={() => {
        follow()
        analytics.trackEvent(ANALYTICS_EVENTS.FOLLOW_USER, { id: user.id })
      }}
    >
      <TextIcon weight="md" size={isLarge ? 'sm' : 'xs'}>
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
