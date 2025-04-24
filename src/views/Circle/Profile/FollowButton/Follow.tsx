import _isNil from 'lodash/isNil'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Button, TextIcon, useMutation, ViewerContext } from '~/components'
import TOGGLE_FOLLOW_CIRCLE from '~/components/GQL/mutations/toggleFollowCircle'
import {
  FollowButtonCirclePrivateFragment,
  ToggleFollowCircleMutation,
} from '~/gql/graphql'

interface FollowProps {
  circle: Partial<FollowButtonCirclePrivateFragment>
}

const Follow = ({ circle }: FollowProps) => {
  const viewer = useContext(ViewerContext)
  const [follow] = useMutation<ToggleFollowCircleMutation>(
    TOGGLE_FOLLOW_CIRCLE,
    {
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
        if (!circle.id) {
          return
        }

        // increment circle's followers count
        cache.modify({
          id: cache.identify(circle),
          fields: {
            followers: (existingFollowers) => {
              return {
                ...existingFollowers,
                totalCount: existingFollowers.totalCount + 1,
              }
            },
          },
        })

        // remove viewer's following circle
        cache.evict({
          id: cache.identify(viewer),
          fieldName: 'following',
        })
      },
    }
  )

  const onClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.followCircle },
        })
      )
      return
    }

    follow()
  }

  return (
    <Button
      size={['5rem', '2rem']}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={onClick}
    >
      <TextIcon weight="medium" size={15}>
        <FormattedMessage defaultMessage="Follow" id="ieGrWo" />
      </TextIcon>
    </Button>
  )
}

export default Follow
