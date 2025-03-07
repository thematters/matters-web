import _isNil from 'lodash/isNil'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button, TextIcon, useMutation } from '~/components'
import TOGGLE_BOOKMARK_TAG from '~/components/GQL/mutations/toggleBookmarkTag'
import {
  TagDigestFollowButtonPrivateFragment,
  ToggleBookmarkTagMutation,
} from '~/gql/graphql'

interface UnfollowTagProps {
  tag: Partial<TagDigestFollowButtonPrivateFragment>
}

const Unfollow = ({ tag }: UnfollowTagProps) => {
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<ToggleBookmarkTagMutation>(
    TOGGLE_BOOKMARK_TAG,
    {
      variables: { id: tag.id, enabled: false },
      optimisticResponse:
        !_isNil(tag.id) && !_isNil(tag.isFollower)
          ? {
              toggleBookmarkTag: {
                id: tag.id,
                isFollower: false,
                __typename: 'Tag',
              },
            }
          : undefined,
    }
  )

  return (
    <Button
      size={[null, '1.5rem']}
      spacing={[0, 12]}
      textColor="white"
      bgColor="green"
      bgActiveColor="red"
      onClick={() => unfollow()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="medium" size={12}>
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
