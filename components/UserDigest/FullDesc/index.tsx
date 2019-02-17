// External modules
import gql from 'graphql-tag'
import { FC, useState } from 'react'

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

const iconStyle = { width: 10, height: 10 }

const IconAdd = () => (
  <Icon id={ICON_ADD.id} viewBox={ICON_ADD.viewBox} style={iconStyle} />
)

const buttonStyle = { width: 64 }

const BaseButton = ({ icon, text, ...props }) => (
  <Button
    size="small"
    style={buttonStyle}
    icon={icon && <IconAdd />}
    {...props}
  >
    {text}
  </Button>
)

const fragments = {
  user: gql`
    fragment UserDigestFullDescUser on User {
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

const FullDesc: FC = ({ user }: { user: UserDigestFullDescUser }) => {
  const getStateText = ({ isFollower, isFollowee }: { user: any }) => {
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
    <section>
      <div className="container">
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
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}

FullDesc.fragments = fragments

export default FullDesc
