import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import IMAGE_MATTERS_ARCHITECT_RING from '@/public/static/icons/architect-ring.svg'
import IMAGE_CIVIC_LIKER_MATTERS_ARCHITECT_RING from '@/public/static/icons/civic-liker-architect-ring.svg'
import IMAGE_CIVIC_LIKER_RING from '@/public/static/icons/civic-liker-ring.svg'
import LOGBOOK from '@/public/static/images/logbook.gif'
import { IconLogbookBadge16, ResponsiveImage } from '~/components'
import { AvatarUserFragment, AvatarUserLogbookFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export type AvatarLogbook = PartialDeep<AvatarUserLogbookFragment>

export interface AvatarProps {
  user?: AvatarUserFragment & AvatarLogbook
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
    [styles.avatar]: true,
    [styles[size]]: true,
    [styles.hasRing]: isCivicLiker || hasArchitectBadge,
    [styles.hasBadge]: hasLogbook,
  })

  return (
    <div className={avatarClasses}>
      <ResponsiveImage
        url={source}
        size="144w"
        disabled={isFallback || inEditor}
      />

      {isCivicLiker && !hasArchitectBadge && (
        <span className="civic-liker ring" />
      )}
      {hasArchitectBadge && !isCivicLiker && (
        <span className="architect ring" />
      )}
      {hasArchitectBadge && isCivicLiker && (
        <span className="civic-architect ring" />
      )}
      {hasLogbook && (
        <section className={styles.badge}>
          {inProfile ? (
            <img
              className={styles.logbook}
              src={LOGBOOK.src}
              alt="logbook icon"
            />
          ) : (
            <IconLogbookBadge16 />
          )}
        </section>
      )}

      <style jsx>{`
        .civic-liker.ring {
          background-image: url(${IMAGE_CIVIC_LIKER_RING});
        }
        .architect.ring {
          background-image: url(${IMAGE_MATTERS_ARCHITECT_RING});
        }
        .civic-architect.ring {
          background-image: url(${IMAGE_CIVIC_LIKER_MATTERS_ARCHITECT_RING});
        }
      `}</style>
    </div>
  )
}

Avatar.fragments = fragments
