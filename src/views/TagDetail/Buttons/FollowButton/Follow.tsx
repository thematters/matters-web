import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import {
  Button,
  IconAdd,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import updateTagFollowers from '~/components/GQL/updates/tagFollowers'

import { ToggleFollowTag } from '~/components/GQL/mutations/__generated__/ToggleFollowTag'
import { FollowButtonTagPrivate } from './__generated__/FollowButtonTagPrivate'

interface FollowProps {
  tag: FollowButtonTagPrivate
}

const Follow = ({ tag }: FollowProps) => {
  const viewer = useContext(ViewerContext)
  const [follow] = useMutation<ToggleFollowTag>(TOGGLE_FOLLOW_TAG, {
    variables: { id: tag.id, enabled: true },
    optimisticResponse:
      !_isNil(tag.id) && !_isNil(tag.isFollower)
        ? {
            toggleFollowTag: {
              id: tag.id,
              isFollower: true,
              __typename: 'Tag',
            },
          }
        : undefined,
    update: (cache) => {
      updateTagFollowers({
        cache,
        id: tag.id,
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
      <TextIcon icon={<IconAdd />} weight="md" size="md-s">
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
