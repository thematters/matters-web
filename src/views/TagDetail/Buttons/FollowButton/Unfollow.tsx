import _isNil from 'lodash/isNil'
import { useContext, useState } from 'react'

import { Button, TextIcon, Translate, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import updateTagFollowers from '~/components/GQL/updates/tagFollowers'

import { ToggleFollowTag } from '~/components/GQL/mutations/__generated__/ToggleFollowTag'
import { FollowButtonTagPrivate } from './__generated__/FollowButtonTagPrivate'

interface UnfollowTagProps {
  tag: FollowButtonTagPrivate
}

const Unfollow = ({ tag }: UnfollowTagProps) => {
  const viewer = useContext(ViewerContext)
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
      updateTagFollowers({
        cache,
        type: 'unfollow',
        id: tag.id,
        viewer,
      })
    },
  })

  return (
    <Button
      size={['7rem', '2.25rem']}
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
