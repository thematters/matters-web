// External modules
import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext, useState } from 'react'

// Internal modules
import { Avatar, Button, Icon, LanguageContext } from '~/components'

import { toPath, translate } from '~/common/utils'
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
const BaseButton = ({
  icon,
  text,
  ...props
}: {
  icon: boolean
  text?: string
  [key: string]: any
}) => (
  <Button size="small" icon={icon && <IconAdd />} {...props}>
    {text}
  </Button>
)

const fragments = {
  user: gql`
    fragment UserDigestFullDescUser on User {
      userName
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

const FullDesc = ({
  user,
  nameSize = 'default'
}: {
  user: UserDigestFullDescUser
  nameSize?: 'default' | 'small'
}) => {
  const { lang } = useContext(LanguageContext)
  const getStateText = ({ isFollower, isFollowee }: UserDigestFullDescUser) => {
    if (isFollower && isFollowee) {
      return translate({ zh_hant: '互相追蹤', zh_hans: '互相追踪', lang })
    }
    if (isFollowee) {
      return translate({ zh_hant: '追蹤了你', zh_hans: '追踪了你', lang })
    }
  }
  const nameSizeClasses = classNames({
    name: true,
    [nameSize]: true
  })
  const stateProps = {
    is: 'span',
    icon: false,
    outlineColor: 'grey',
    text: getStateText(user),
    style: { borderWidth: '1px' }
  }
  const baseButtonProps = {
    bgColor: user.isFollower ? 'green' : undefined,
    outlineColor: !user.isFollower ? 'green' : undefined,
    icon: !user.isFollower,
    text: user.isFollower
      ? translate({ zh_hant: '已追蹤', zh_hans: '已追踪', lang })
      : translate({ zh_hant: '追蹤', zh_hans: '追踪', lang })
  }
  const cancelButtonProps = {
    ...baseButtonProps,
    bgColor: 'red',
    text: translate({ zh_hant: '取消追蹤', zh_hans: '取消追踪', lang })
  }
  const path = toPath({
    page: 'userProfile',
    userName: user.userName
  })

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
        <Link {...path}>
          <a>
            <Avatar size="default" user={user} />
          </a>
        </Link>

        <section className="content">
          <header className="header-container">
            <div className="header-left">
              <Link {...path}>
                <a>
                  <span className={nameSizeClasses}>{user.displayName}</span>
                </a>
              </Link>
              {user.isFollowee && <BaseButton {...stateProps} />}
            </div>

            <div className="header-right">
              {!user.isFollower && (
                <BaseButton onClick={follow} {...buttonProps} />
              )}
              {user.isFollower && (
                <BaseButton
                  onClick={unfollow}
                  onMouseEnter={mouseEnter}
                  onMouseLeave={mouseLeave}
                  {...buttonProps}
                />
              )}
            </div>
          </header>

          <Link {...path}>
            <a>
              <p className="description">{user.info.description}</p>
            </a>
          </Link>
        </section>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}

FullDesc.fragments = fragments

export default FullDesc
