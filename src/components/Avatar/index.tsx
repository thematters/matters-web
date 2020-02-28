import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_AVATAR_DEFAULT from '~/static/icons/avatar-default.svg'

import styles from './styles.css'

import { AvatarUser } from './__generated__/AvatarUser'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface AvatarProps {
  user?: AvatarUser
  size?: AvatarSize
  src?: string
}

const fragments = {
  user: gql`
    fragment AvatarUser on User {
      avatar
    }
  `
}

export const Avatar = (props: AvatarProps) => {
  const { user, size = '', src } = props
  const source = src || user?.avatar || ICON_AVATAR_DEFAULT
  const avatarClasses = classNames({
    avatar: true,
    [size]: !!size
  })

  return (
    <>
      <div
        className={avatarClasses}
        style={{ backgroundImage: `url(${source})` }}
        aria-hidden="true"
      />

      <style jsx>{styles}</style>
    </>
  )
}

Avatar.fragments = fragments
