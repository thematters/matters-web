import _isNil from 'lodash/isNil'

import { Button, TextIcon, Translate, useMutation } from '~/components'
import TOGGLE_FOLLOW_CIRCLE from '~/components/GQL/mutations/toggleFollowCircle'
import updateCircleFollowerCount from '~/components/GQL/updates/circleFollowerCount'

import { ToggleFollowCircle } from '~/components/GQL/mutations/__generated__/ToggleFollowCircle'
import { FollowButtonCirclePrivate } from './__generated__/FollowButtonCirclePrivate'

interface FollowProps {
  circle: FollowButtonCirclePrivate
}

const Follow = ({ circle }: FollowProps) => {
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
      updateCircleFollowerCount({
        cache,
        name: circle.name,
        type: 'increment',
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
      onClick={() => follow()}
    >
      <TextIcon weight="md" size="md-s">
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
