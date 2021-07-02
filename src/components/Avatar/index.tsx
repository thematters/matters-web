import classNames from 'classnames'
import gql from 'graphql-tag'

import { ResponsiveImage } from '~/components'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import IMAGE_MATTERS_ARCHITECT_RING from '@/public/static/icons/architect-ring.svg'
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
      info {
        badges {
          type
        }
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
  const badges = user?.info?.badges || []
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const avatarClasses = classNames({
    avatar: true,
    [size]: true,
    hasRing: isCivicLiker || hasArchitectBadge,
  })

  return (
    <div className={avatarClasses}>
      <ResponsiveImage
        url={source}
        size="144w"
        disabled={isFallback || inEditor}
      />

      {isCivicLiker && <span className="civic-liker ring" />}
      {hasArchitectBadge && <span className="architect ring" />}

      <style jsx>{styles}</style>

      <style jsx>{`
        .civic-liker.ring {
          background-image: url(${IMAGE_CIVIC_LIKER_RING});
        }
        .architect.ring {
          background-image: url(${IMAGE_MATTERS_ARCHITECT_RING});
        }
      `}</style>
    </div>
  )
}

Avatar.fragments = fragments
