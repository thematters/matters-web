import gql from 'graphql-tag'
import { useState } from 'react'
import { Mutation } from 'react-apollo'

import { Button, Translate } from '~/components'

import { FollowButtonUser } from './__generated__/FollowButtonUser'
import { updateViewerFolloweeCount } from './utils'

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(input: { id: $id }) {
      id
      isFollowee
      isFollower
    }
  }
`

const Unfollow = ({ user }: { user: FollowButtonUser }) => {
  const [hover, setHover] = useState(false)

  return (
    <Mutation
      mutation={UNFOLLOW_USER}
      variables={{ id: user.id }}
      optimisticResponse={{
        unfollowUser: {
          id: user.id,
          isFollowee: false,
          isFollower: user.isFollower,
          __typename: 'User'
        }
      }}
      update={cache => {
        updateViewerFolloweeCount({ cache, type: 'decrement' })
      }}
    >
      {(unfollow, { data }) => (
        <Button
          size="small"
          style={{ width: '4rem' }}
          onClick={unfollow}
          bgColor={hover ? 'red' : 'green'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover ? (
            <Translate zh_hant="取消追蹤" zh_hans="取消追踪" />
          ) : (
            <Translate zh_hant="已追蹤" zh_hans="已追踪" />
          )}
        </Button>
      )}
    </Mutation>
  )
}

export default Unfollow
