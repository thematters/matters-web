import _isNil from 'lodash/isNil'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import {
  Button,
  IconAdd16,
  TextIcon,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateTagFollowers } from '~/components/GQL'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import {
  FollowButtonTagPrivateFragment,
  ToggleFollowTagMutation,
} from '~/gql/graphql'

interface FollowProps {
  tag: FollowButtonTagPrivateFragment
}

const Follow = ({ tag }: FollowProps) => {
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
      <TextIcon icon={<IconAdd16 />} weight="md" size="mdS">
        <FormattedMessage defaultMessage="Follow" id="ieGrWo" />
      </TextIcon>
    </Button>
  )
}

export default Follow
