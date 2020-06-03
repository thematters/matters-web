import gql from 'graphql-tag'
import _get from 'lodash/get'
import _isNil from 'lodash/isNil'
import { useState } from 'react'

import {
  Button,
  ButtonHeight,
  ButtonWidth,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import updateUserFollowerCount from '~/components/GQL/updates/userFollowerCount'
import updateViewerFolloweeCount from '~/components/GQL/updates/viewerFolloweeCount'

import { FollowButtonSize } from './index'

import { FollowButtonUser } from './__generated__/FollowButtonUser'
import { UnfollowUser } from './__generated__/UnfollowUser'

interface UnfollowProps {
  user: Partial<FollowButtonUser>
  size: FollowButtonSize
}

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!) {
    toggleFollowUser(input: { id: $id }) {
      id
      isFollowee
      isFollower
    }
  }
`

const Unfollow = ({ user, size }: UnfollowProps) => {
  const [hover, setHover] = useState(false)
  const [unfollow] = useMutation<UnfollowUser>(UNFOLLOW_USER, {
    variables: { id: user.id },
    optimisticResponse:
      !_isNil(user.id) && !_isNil(user.isFollower)
        ? {
            toggleFollowUser: {
              id: user.id,
              isFollowee: false,
              isFollower: user.isFollower,
              __typename: 'User',
            },
          }
        : undefined,
    update: (cache) => {
      const userName = _get(user, 'userName', null)
      updateUserFollowerCount({ cache, type: 'decrement', userName })
      updateViewerFolloweeCount({ cache, type: 'decrement' })
    },
  })

  const sizes: Record<FollowButtonSize, [ButtonWidth, ButtonHeight]> = {
    lg: ['6rem', '2rem'],
    md: ['4rem', '1.5rem'],
    'md-s': ['3.25rem', '1.5rem'],
  }

  return (
    <Button
      size={sizes[size]}
      textColor="white"
      bgColor="green"
      bgActiveColor="red"
      onClick={unfollow}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TextIcon weight="md" size={size === 'lg' ? 'sm' : 'xs'}>
        {hover ? <Translate id="unfollow" /> : <Translate id="followed" />}
      </TextIcon>
    </Button>
  )
}

export default Unfollow
