import _isNil from 'lodash/isNil'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Button, TextIcon, useMutation, ViewerContext } from '~/components'
import TOGGLE_BOOKMARK_TAG from '~/components/GQL/mutations/toggleBookmarkTag'
import {
  TagDigestFollowButtonPrivateFragment,
  ToggleBookmarkTagMutation,
} from '~/gql/graphql'

interface Props {
  tag: Partial<TagDigestFollowButtonPrivateFragment>
}

const Follow = ({ tag }: Props) => {
  const viewer = useContext(ViewerContext)

  const [follow] = useMutation<ToggleBookmarkTagMutation>(TOGGLE_BOOKMARK_TAG, {
    variables: { id: tag.id, enabled: true },
    optimisticResponse:
      !_isNil(tag.id) && !_isNil(tag.isFollower)
        ? {
            toggleBookmarkTag: {
              id: tag.id,
              isFollower: true,
              __typename: 'Tag',
            },
          }
        : undefined,
  })

  const onClick = () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.followTag },
        })
      )
      return
    }

    follow()
  }

  return (
    <Button
      size={[null, '1.5rem']}
      spacing={[0, 12]}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={onClick}
    >
      <TextIcon weight="medium" size={12}>
        <FormattedMessage defaultMessage="Follow" id="ieGrWo" />
      </TextIcon>
    </Button>
  )
}

export default Follow
