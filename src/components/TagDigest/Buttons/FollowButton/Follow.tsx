import _isNil from 'lodash/isNil'

import { Button, TextIcon, Translate, useMutation } from '~/components'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import updateViewerFollowingTagCount from '~/components/GQL/updates/viewerFollowingTagCount'

import { ToggleFollowTag } from '~/components/GQL/mutations/__generated__/ToggleFollowTag'
import { TagDigestFollowButtonPrivate } from './__generated__/TagDigestFollowButtonPrivate'

interface Props {
  tag: Partial<TagDigestFollowButtonPrivate>
}

const Follow = ({ tag }: Props) => {
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
      updateViewerFollowingTagCount({ cache, type: 'increment' })
    },
  })

  return (
    <Button
      size={['3rem', '1.5rem']}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={() => follow()}
    >
      <TextIcon weight="md" size="xs">
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
