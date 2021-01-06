import _isNil from 'lodash/isNil'
import { useContext, useState } from 'react'

import { Button, TextIcon, Translate, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import TOGGLE_FOLLOW_CIRCLE from '~/components/GQL/mutations/toggleFollowCircle'
import updateCircleFollowers from '~/components/GQL/updates/circleFollowers'

import { ToggleFollowCircle } from '~/components/GQL/mutations/__generated__/ToggleFollowCircle'
import { FollowButtonCirclePrivate } from './__generated__/FollowButtonCirclePrivate'

interface UnfollowCircleProps {
  circle: FollowButtonCirclePrivate
}

const Unfollow = ({ circle }: UnfollowCircleProps) => {
  const viewer = useContext(ViewerContext)
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<ToggleFollowCircle>(TOGGLE_FOLLOW_CIRCLE, {
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
      updateCircleFollowers({
        cache,
        type: 'unfollow',
        id: circle.id,
        viewer,
      })
    },
  })

  return (
    <Button
      size={['5rem', '2rem']}
      textColor="white"
      bgColor="green"
      bgActiveColor="red"
      onClick={unfollow}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="md" size="md-s">
        {hover ? <Translate id="unfollow" /> : <Translate id="followed" />}
      </TextIcon>
    </Button>
  )
}

export default Unfollow
