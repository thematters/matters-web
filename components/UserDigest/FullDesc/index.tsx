// External modules
import gql from 'graphql-tag'
import { useState } from 'react'

// Internal modules
import { Avatar, Button, Icon } from '~/components'
import ICON_ADD from '~/static/icons/add.svg?sprite'
import { UserDigestFullDescUser } from './__generated__/UserDigestFullDescUser'
import styles from './styles.css'

/**
 * UeserDigest.FullDesc is a component for presenting user's avatar, display
 * name, description and follower/followee state.
 *
 * Usage:
 *
 *   <UserDigest.FullDesc user={user} />
 */

const IconAdd = () => (
  <Icon
    id={ICON_ADD.id}
    viewBox={ICON_ADD.viewBox}
    style={{ width: 10, height: 10 }}
  />
)
const BaseButton = ({ icon, text, ...props }) => (
  <Button size="small" icon={icon && <IconAdd />} {...props}>
    {text}
  </Button>
)

const fragments = {
  user: gql`
    fragment UserDigestFullDescUser on User {
      displayName
      info {
        description
      }
      isFollower
      isFollowee
      ...AvatarUser
    }
    ${Avatar.fragments.user}
  `
}

const FullDesc = ({ user }: { user: UserDigestFullDescUser }) => {
  const getStateText = ({ isFollower, isFollowee }: UserDigestFullDescUser) => {
    if (isFollower && isFollowee) {
      return '互相追蹤'
    }
    if (isFollowee) {
      return '追蹤了你'
    }
  }
  const stateProps = {
    is: 'span',
    outlineColor: 'grey',
    text: getStateText(user),
    style: { borderWidth: '1px' }
  }
  const baseButtonProps = {
    bgColor: user.isFollower ? 'green' : undefined,
    outlineColor: !user.isFollower ? 'green' : undefined,
    icon: !user.isFollower,
    text: user.isFollower ? '已追蹤' : '追蹤'
  }
  const cancelButtonProps = {
    bgColor: 'red',
    text: '取消追蹤'
  }

  const [buttonProps, setButtonProps] = useState(baseButtonProps)
  const mouseEnter = () => setButtonProps(cancelButtonProps)
  const mouseLeave = () => setButtonProps(baseButtonProps)
  const follow = () => {
    // TODO
  }
  const unfollow = () => {
    // TODO
  }

  return (
    <>
      <section className="container">
        <div className="sub-container">
          <Avatar size="default" user={user} />
          <div className="content-container">
            <div>
              <span className="name">{user.displayName}</span>
              {user.isFollowee && <BaseButton {...stateProps} />}
            </div>
            <div className="description">{user.info.description}</div>
          </div>
        </div>
        {!user.isFollower && <BaseButton onClick={follow} {...buttonProps} />}
        {user.isFollower && (
          <BaseButton
            onClick={unfollow}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            {...buttonProps}
          />
        )}
      </section>
      <style jsx>{styles}</style>
    </>
  )
}

FullDesc.fragments = fragments

export default FullDesc
