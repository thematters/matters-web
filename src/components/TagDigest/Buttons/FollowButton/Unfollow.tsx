import _isNil from 'lodash/isNil'
import { useState } from 'react'

import { Button, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import updateViewerFollowingTagCount from '~/components/GQL/updates/viewerFollowingTagCount'

import { ToggleFollowTag } from '~/components/GQL/mutations/__generated__/ToggleFollowTag'
import { TagDigestFollowButtonPrivate } from './__generated__/TagDigestFollowButtonPrivate'

interface UnfollowTagProps {
  tag: Partial<TagDigestFollowButtonPrivate>
}

const Unfollow = ({ tag }: UnfollowTagProps) => {
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<ToggleFollowTag>(TOGGLE_FOLLOW_TAG, {
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
      size={['3rem', '1.5rem']}
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
