import _isNil from 'lodash/isNil'
import { useState } from 'react'

import { Button, TextIcon, Translate, useMutation } from '~/components'
import { updateViewerFollowingTagCount } from '~/components/GQL'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import {
  TagDigestFollowButtonPrivateFragment,
  ToggleFollowTagMutation,
} from '~/gql/graphql'

interface UnfollowTagProps {
  tag: Partial<TagDigestFollowButtonPrivateFragment>
}

const Unfollow = ({ tag }: UnfollowTagProps) => {
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<ToggleFollowTagMutation>(TOGGLE_FOLLOW_TAG, {
    variables: { id: tag.id, enabled: false },
    optimisticResponse:
      !_isNil(tag.id) && !_isNil(tag.isFollower)
        ? {
            toggleFollowTag: {
              id: tag.id,
              isFollower: false,
              __typename: 'Tag',
            },
          }
        : undefined,
    update: (cache) => {
      updateViewerFollowingTagCount({ cache, type: 'decrement' })
    },
  })

  return (
    <Button
      size={[null, '1.5rem']}
      spacing={[0, 'tight']}
      textColor="white"
      bgColor="green"
      bgActiveColor="red"
      onClick={() => unfollow()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="md" size="xs">
        {hover ? <Translate id="unfollow" /> : <Translate id="followed" />}
      </TextIcon>
    </Button>
  )
}

export default Unfollow
