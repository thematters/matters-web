import _isNil from 'lodash/isNil'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button, TextIcon, useMutation, ViewerContext } from '~/components'
import {
  updateCircleFollowerCount,
  updateCircleFollowers,
} from '~/components/GQL'
import TOGGLE_FOLLOW_CIRCLE from '~/components/GQL/mutations/toggleFollowCircle'
import {
  FollowButtonCirclePrivateFragment,
  ToggleFollowCircleMutation,
} from '~/gql/graphql'

interface UnfollowCircleProps {
  circle: Partial<FollowButtonCirclePrivateFragment>
}

const Unfollow = ({ circle }: UnfollowCircleProps) => {
  const viewer = useContext(ViewerContext)
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<ToggleFollowCircleMutation>(
    TOGGLE_FOLLOW_CIRCLE,
    {
      variables: { id: circle.id, enabled: false },
      optimisticResponse:
        !_isNil(circle.id) && !_isNil(circle.isFollower)
          ? {
              toggleFollowCircle: {
                id: circle.id,
                isFollower: false,
                __typename: 'Circle',
              },
            }
          : undefined,
      update: (cache) => {
        updateCircleFollowerCount({
          cache,
          type: 'decrement',
          name: circle.name || '',
        })
        updateCircleFollowers({
          cache,
          type: 'unfollow',
          name: circle.name || '',
          viewer,
        })
      },
    }
  )

  return (
    <Button
      size={['5rem', '2rem']}
      textColor="white"
      bgColor="green"
      bgActiveColor="red"
      onClick={() => unfollow()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="medium" size={15}>
        {hover ? (
          <FormattedMessage defaultMessage="Unfollow" id="izWS4J" />
        ) : (
          <FormattedMessage defaultMessage="Followed" id="LGox1K" />
        )}
      </TextIcon>
    </Button>
  )
}

export default Unfollow
