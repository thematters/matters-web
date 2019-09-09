import gql from 'graphql-tag'
import { useState } from 'react'

import { Button, Translate } from '~/components'
import { Mutation } from '~/components/GQL'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import { FollowButtonUser } from './__generated__/FollowButtonUser'

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(input: { id: $id }) {
      id
      isFollowee
      isFollower
    }
  }
`

const Unfollow = ({
  user,
  size = 'small'
}: {
  user: FollowButtonUser
  size?: 'small' | 'default'
}) => {
  const [hover, setHover] = useState(false)

  return (
    <Mutation
      mutation={UNFOLLOW_USER}
      variables={{ id: user.id }}
      optimisticResponse={{
        unfollowUser: {
          id: user.id,
          isFollowee: false,
          isFollower: user.isFollower,
          __typename: 'User'
        }
      }}
      update={cache => {
        updateViewerFolloweeCount({ cache, type: 'decrement' })
      }}
    >
      {(unfollow, { data }) => (
        <Button
          size={size}
          style={size === 'small' ? { width: '4rem' } : { width: '5.5rem' }}
          onClick={() => {
            unfollow()
            analytics.trackEvent(ANALYTICS_EVENTS.UNFOLLOW_USER, {
              id: user.id
            })
          }}
          bgColor={hover ? 'red' : 'green'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover ? (
            <Translate
              zh_hant={TEXT.zh_hant.unfollow}
              zh_hans={TEXT.zh_hans.unfollow}
            />
          ) : (
            <Translate
              zh_hant={TEXT.zh_hant.followed}
              zh_hans={TEXT.zh_hans.followed}
            />
          )}
        </Button>
      )}
    </Mutation>
  )
}

export default Unfollow
