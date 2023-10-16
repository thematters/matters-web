import classNames from 'classnames'
import gql from 'graphql-tag'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import IMAGE_MATTERS_ARCHITECT_RING from '@/public/static/icons/architect-ring.svg'
import IMAGE_CIVIC_LIKER_MATTERS_ARCHITECT_RING from '@/public/static/icons/civic-liker-architect-ring.svg'
import IMAGE_CIVIC_LIKER_RING from '@/public/static/icons/civic-liker-ring.svg'
import LOGBOOK from '@/public/static/images/logbook.gif'
import { IconLogbookBadge16, ResponsiveImage, Tooltip } from '~/components'
import { AvatarUserFragment, AvatarUserLogbookFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type AvatarSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'mdS'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'xxxlm'
  | 'xxxll'
  | 'xxxxl'

export type AvatarLogbook = PartialDeep<AvatarUserLogbookFragment>

export interface AvatarProps {
  user?: AvatarUserFragment & AvatarLogbook
  size?: AvatarSize
  src?: string | null
  inEditor?: boolean
  inProfile?: boolean
  title?: string
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
  const { user, size = 'default', src, title, inEditor, inProfile } = props
  const source = src || user?.avatar || ICON_AVATAR_DEFAULT
  const isFallback =
    (!src && !user?.avatar) || source.indexOf('data:image') >= 0
  const isCivicLiker = user?.liker.civicLiker
  const badges = user?.info?.badges || []
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasLogbook = !!user?.info?.cryptoWallet?.hasNFTs
  const avatarClasses = classNames({
    [styles.avatar]: true,
    avatar: true, // global selector for overwirting
    [styles[size]]: true,
    [styles.hasRing]: isCivicLiker || hasArchitectBadge,
    [styles.hasBadge]: hasLogbook,
  })

  const style = {
    '--avatar-ring-civic-liker': `url(${IMAGE_CIVIC_LIKER_RING})`,
    '--avatar-ring-architect': `url(${IMAGE_MATTERS_ARCHITECT_RING})`,
    '--avatar-ring-civic-architect': `url(${IMAGE_CIVIC_LIKER_MATTERS_ARCHITECT_RING})`,
  } as React.CSSProperties

  return (
    <div className={avatarClasses} style={style} title={title}>
      <ResponsiveImage
        url={source}
        width={152}
        height={152}
        smUpWidth={240}
        smUpHeight={240}
        disabled={isFallback || inEditor}
      />

      {isCivicLiker && !hasArchitectBadge && (
        <span className={[styles.ring, styles.civicLiker].join(' ')} />
      )}
      {hasArchitectBadge && !isCivicLiker && (
        <span className={[styles.ring, styles.architect].join(' ')} />
      )}
      {hasArchitectBadge && isCivicLiker && (
        <span className={[styles.ring, styles.civicRrchitect].join(' ')} />
      )}
      {hasLogbook && (
        <section className={styles.badge}>
          {inProfile ? (
            <Tooltip content="Logbook">
              <img
                className={styles.logbook}
                src={LOGBOOK.src}
                alt="logbook icon"
              />
            </Tooltip>
          ) : (
            <IconLogbookBadge16 />
          )}
        </section>
      )}
    </div>
  )
}

Avatar.fragments = fragments
