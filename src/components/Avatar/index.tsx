import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/avatar-default.svg'
import IMAGE_CIVIC_LIKER_RING from '@/public/static/icons/civic-liker-ring.svg'

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
      liker {
        civicLiker
      }
    }
  `,
}

export const Avatar = (props: AvatarProps) => {
  const { user, size = 'default', src } = props
  const source = src || user?.avatar || ICON_AVATAR_DEFAULT
  const isCivicLiker = user?.liker.civicLiker
  const avatarClasses = classNames({
    avatar: true,
    [size]: true,
    'civic-liker': isCivicLiker,
  })

  return (
    <>
      <div
        className={avatarClasses}
        data-lazy-loading
        data-background-image={source}
        aria-hidden="true"
      >
        {isCivicLiker && <span className="ring" />}
      </div>

      <style jsx>{styles}</style>

      <style jsx>{`
        .ring {
          background-image: url(${IMAGE_CIVIC_LIKER_RING});
        }
      `}</style>
    </>
  )
}

Avatar.fragments = fragments
