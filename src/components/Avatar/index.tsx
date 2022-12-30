import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import IMAGE_MATTERS_ARCHITECT_RING from '@/public/static/icons/architect-ring.svg'
import IMAGE_CIVIC_LIKER_RING from '@/public/static/icons/civic-liker-ring.svg'
import LOGBOOK from '@/public/static/images/logbook.gif'
import { IconLogbookBadge16, ResponsiveImage } from '~/components'

import { AvatarUser } from './__generated__/AvatarUser'
import { AvatarUserLogbook } from './__generated__/AvatarUserLogbook'
import styles from './styles.css'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export type AvatarLogbook = PartialDeep<AvatarUserLogbook>

export interface AvatarProps {
  user?: AvatarUser & AvatarLogbook
  size?: AvatarSize
  src?: string | null
  inEditor?: boolean
  inProfile?: boolean
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
  logbook: gql`
    fragment AvatarUserLogbook on User {
      info {
        cryptoWallet {
          id
          address
          hasNFTs
        }
      }
    }
  `,
}

export const Avatar = (props: AvatarProps) => {
  const { user, size = 'default', src, inEditor, inProfile } = props
  const source = src || user?.avatar || ICON_AVATAR_DEFAULT
  const isFallback =
    (!src && !user?.avatar) || source.indexOf('data:image') >= 0
  const isCivicLiker = user?.liker.civicLiker
  const badges = user?.info?.badges || []
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasLogbook = !!user?.info?.cryptoWallet?.hasNFTs
  const avatarClasses = classNames({
    avatar: true,
    [size]: true,
    hasRing: isCivicLiker || hasArchitectBadge,
    hasBadge: hasLogbook,
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
      {hasLogbook && (
        <section className="badge">
          {inProfile ? (
            <img className="logbook" src={LOGBOOK.src} />
          ) : (
            <IconLogbookBadge16 />
          )}
        </section>
      )}

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
