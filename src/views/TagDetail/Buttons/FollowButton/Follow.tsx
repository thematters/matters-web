import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import {
  Button,
  IconAdd16,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { ToggleFollowTag } from '~/components/GQL/mutations/__generated__/ToggleFollowTag'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import updateTagFollowers from '~/components/GQL/updates/tagFollowers'

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

  const onClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { source: UNIVERSAL_AUTH_SOURCE.followTag },
        })
      )
      return
    }

    follow()
  }

  return (
    <Button
      spacing={['xtight', 'tight']}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={onClick}
    >
      <TextIcon icon={<IconAdd16 />} weight="md" size="md-s">
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
