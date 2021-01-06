import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import { Button, TextIcon, Translate, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import TOGGLE_FOLLOW_CIRCLE from '~/components/GQL/mutations/toggleFollowCircle'
import updatecircleFollowers from '~/components/GQL/updates/circleFollowers'

import { ToggleFollowCircle } from '~/components/GQL/mutations/__generated__/ToggleFollowCircle'
import { FollowButtonCirclePrivate } from './__generated__/FollowButtonCirclePrivate'

interface FollowProps {
  circle: FollowButtonCirclePrivate
}

const Follow = ({ circle }: FollowProps) => {
  const viewer = useContext(ViewerContext)
  const [follow] = useMutation<ToggleFollowCircle>(TOGGLE_FOLLOW_CIRCLE, {
    variables: { id: circle.id, enabled: true },
    optimisticResponse:
      !_isNil(circle.id) && !_isNil(circle.isFollower)
        ? {
            toggleFollowCircle: {
              id: circle.id,
              isFollower: true,
              __typename: 'Circle',
            },
          }
        : undefined,
    update: (cache) => {
      updatecircleFollowers({
        cache,
        id: circle.id,
        type: 'follow',
        viewer,
      })
    },
  })

  return (
    <Button
      size={['5rem', '2rem']}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={follow}
    >
      <TextIcon weight="md" size="md-s">
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
