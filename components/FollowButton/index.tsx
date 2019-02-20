// External modules
import gql from 'graphql-tag'
import { useState } from 'react'
import { Mutation } from 'react-apollo'

// Internal modules
import { Button, Icon } from '~/components'
import FollowState from './FollowState'

import ICON_ADD from '~/static/icons/add.svg?sprite'
import { FollowStateUser } from './__generated__/FollowStateUser'

const FOLLOW_USER = gql`
  mutation FollowUser($id: ID!) {
    followUser(input: { id: $id })
  }
`
const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(input: { id: $id })
  }
`
const fragments = {
  user: gql`
    fragment FollowStateUser on User {
      id
      isFollower
      isFollowee
    }
  `
}
const USER_FOLLOW_STATE = gql`
  query UserFollowState($id: ID!) {
    node(input: { id: $id }) {
      ... on User {
        ...FollowStateUser
      }
    }
  }
  ${fragments.user}
`

const IconAdd = () => (
  <Icon
    id={ICON_ADD.id}
    viewBox={ICON_ADD.viewBox}
    style={{ width: 10, height: 10 }}
  />
)
const BaseButton = ({
  icon,
  text,
  ...props
}: {
  icon: boolean
  text?: string
  [key: string]: any
}) => (
  <Button
    size="small"
    icon={icon && <IconAdd />}
    style={{ width: '4rem' }}
    {...props}
  >
    {text}
  </Button>
)

export const FollowButton = ({ user }: { user: FollowStateUser }) => {
  /**
   * Follow Button
   */
  if (!user.isFollowee) {
    return (
      <Mutation
        mutation={FOLLOW_USER}
        variables={{ id: user.id }}
        optimisticResponse={{ followUser: true }}
        refetchQueries={[
          {
            query: USER_FOLLOW_STATE,
            variables: { id: user.id }
          }
        ]}
      >
        {(follow, { data }) => (
          <BaseButton onClick={follow} outlineColor="green" icon text="追蹤" />
        )}
      </Mutation>
    )
  }

  /**
   * Unfollow Button
   */
  const [hover, setHover] = useState(false)
  const cancelButtonProps = {
    bgColor: 'red',
    icon: false,
    text: '取消追蹤'
  }
  const followedButtonProps = {
    bgColor: 'green',
    icon: false,
    text: '已追蹤'
  }

  return (
    <Mutation
      mutation={UNFOLLOW_USER}
      variables={{ id: user.id }}
      optimisticResponse={{ unfollowUser: true }}
      refetchQueries={[
        {
          query: USER_FOLLOW_STATE,
          variables: { id: user.id }
        }
      ]}
    >
      {(unfollow, { data }) => (
        <BaseButton
          onClick={unfollow}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          {...(hover ? cancelButtonProps : followedButtonProps)}
        />
      )}
    </Mutation>
  )
}

FollowButton.fragments = fragments
FollowButton.State = FollowState
