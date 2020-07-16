import classNames from 'classnames'
import { gql } from '@apollo/client'

import { Img } from '~/components'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/avatar-default.svg'
import IMAGE_CIVIC_LIKER_RING from '@/public/static/icons/civic-liker-ring.svg'

import styles from './styles.css'

import { AvatarUser } from './__generated__/AvatarUser'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface AvatarProps {
  user?: AvatarUser
  size?: AvatarSize
  src?: string
  inEditor?: boolean
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
  const { user, size = 'default', src, inEditor } = props
  const source = src || user?.avatar || ICON_AVATAR_DEFAULT
  const isFallback =
    (!src && !user?.avatar) || source.indexOf('data:image') >= 0
  const isCivicLiker = user?.liker.civicLiker
  const avatarClasses = classNames({
    avatar: true,
    [size]: true,
    'civic-liker': isCivicLiker,
  })

  return (
    <div className={avatarClasses}>
      <Img url={source} size="144w" disabled={isFallback || inEditor} />

      {isCivicLiker && <span className="ring" />}

      <style jsx>{styles}</style>

      <style jsx>{`
        .ring {
          background-image: url(${IMAGE_CIVIC_LIKER_RING});
        }
      `}</style>
    </div>
  )
}

Avatar.fragments = fragments
