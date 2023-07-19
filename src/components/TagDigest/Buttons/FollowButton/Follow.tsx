import _isNil from 'lodash/isNil'
import { useContext } from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import {
  Button,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import updateViewerFollowingTagCount from '~/components/GQL/updates/viewerFollowingTagCount'
import {
  TagDigestFollowButtonPrivateFragment,
  ToggleFollowTagMutation,
} from '~/gql/graphql'

interface Props {
  tag: Partial<TagDigestFollowButtonPrivateFragment>
}

const Follow = ({ tag }: Props) => {
  const viewer = useContext(ViewerContext)

  const [follow] = useMutation<ToggleFollowTagMutation>(TOGGLE_FOLLOW_TAG, {
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
      size={[null, '1.5rem']}
      spacing={[0, 'tight']}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={onClick}
    >
      <TextIcon weight="md" size="xs">
        <Translate id="follow" />
      </TextIcon>
    </Button>
  )
}

export default Follow
