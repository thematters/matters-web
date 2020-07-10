import gql from 'graphql-tag'
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
import updateTagFollowers from '~/components/GQL/updates/tagFollowers'

import { FollowButtonTag as FollowButtonTagType } from './__generated__/FollowButtonTag'
import { FollowTag } from './__generated__/FollowTag'

interface FollowProps {
  tag: FollowButtonTagType
}

const FOLLOW_TAG = gql`
  mutation FollowTag($id: ID!) {
    toggleFollowTag(input: { id: $id }) {
      id
      isFollower
    }
  }
`

const Follow = ({ tag }: FollowProps) => {
  const viewer = useContext(ViewerContext)
  const [follow] = useMutation<FollowTag>(FOLLOW_TAG, {
    variables: { id: tag.id },
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
      size={['7rem', '2.25rem']}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      onClick={follow}
    >
      <TextIcon icon={<IconAdd />} weight="md" size="md-s">
        <Translate zh_hant="追蹤標籤" zh_hans="追踪标签" />
      </TextIcon>
    </Button>
  )
}

export default Follow
