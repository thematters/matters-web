import _isNil from 'lodash/isNil'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button, TextIcon, useMutation, ViewerContext } from '~/components'
import { updateTagFollowers } from '~/components/GQL'
import TOGGLE_FOLLOW_TAG from '~/components/GQL/mutations/toggleFollowTag'
import {
  FollowButtonTagPrivateFragment,
  ToggleFollowTagMutation,
} from '~/gql/graphql'

interface UnfollowTagProps {
  tag: FollowButtonTagPrivateFragment
}

const Unfollow = ({ tag }: UnfollowTagProps) => {
  const viewer = useContext(ViewerContext)
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
      spacing={['xtight', 'tight']}
      textColor="white"
      bgColor="green"
      bgActiveColor="red"
      onClick={() => unfollow()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="md" size="mdS">
        {hover ? (
          <FormattedMessage defaultMessage="Unfollow" id="izWS4J" />
        ) : (
          <FormattedMessage defaultMessage="Followed" id="LGox1K" />
        )}
      </TextIcon>
    </Button>
  )
}

export default Unfollow
