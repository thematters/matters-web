import { gql } from '@apollo/client'
import _isNil from 'lodash/isNil'
import { useContext, useState } from 'react'

import { Button, TextIcon, Translate, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import updateTagFollowers from '~/components/GQL/updates/tagFollowers'

import { FollowButtonTag as FollowButtonTagType } from './__generated__/FollowButtonTag'
import { UnfollowTag } from './__generated__/UnfollowTag'

interface UnfollowTagProps {
  tag: FollowButtonTagType
}

const UNFOLLOW_TAG = gql`
  mutation UnfollowTag($id: ID!) {
    toggleFollowTag(input: { id: $id }) {
      id
      isFollower
    }
  }
`

const Unfollow = ({ tag }: UnfollowTagProps) => {
  const viewer = useContext(ViewerContext)
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<UnfollowTag>(UNFOLLOW_TAG, {
    variables: { id: tag.id },
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
