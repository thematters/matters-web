import classNames from 'classnames'
import gql from 'graphql-tag'

import IMAGE_MATTERS_ARCHITECT_RING from '@/public/static/icons/architect-ring.svg?url'
import IMAGE_AVATAR_DEFAULT from '@/public/static/icons/avatar-default.svg?url'
import IMAGE_CIVIC_LIKER_MATTERS_ARCHITECT_RING from '@/public/static/icons/civic-liker-architect-ring.svg?url'
import IMAGE_CIVIC_LIKER_RING from '@/public/static/icons/civic-liker-ring.svg?url'
import IconLogbook from '@/public/static/icons/logbook.svg'
import LOGBOOK from '@/public/static/images/logbook.gif'
import { TEST_ID } from '~/common/enums'
import { Icon, ResponsiveImage, Tooltip } from '~/components'
import { AvatarUserFragment, AvatarUserLogbookFragment } from '~/gql/graphql'

import { Placeholder } from './Placeholder'
import styles from './styles.module.css'

export type AvatarSize =
  | 16
  | 20
  | 22
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 72
  | 76
  | 88
  | 120

export type AvatarLogbook = PartialDeep<AvatarUserLogbookFragment>

export interface AvatarProps {
  user?: AvatarUserFragment & AvatarLogbook
  size?: AvatarSize
  src?: string | null
  inEditor?: boolean
  inProfile?: boolean
  showLogbook?: boolean
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
  const {
    user,
    size = 40,
    src,
    title,
    inEditor,
    inProfile,
    showLogbook = true,
  } = props
  const source = src || user?.avatar || IMAGE_AVATAR_DEFAULT
  const isFallback =
    (!src && !user?.avatar) || source.indexOf('data:image') >= 0
  const isCivicLiker = user?.liker.civicLiker
  const badges = user?.info?.badges || []
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasLogbook = showLogbook && !!user?.info?.cryptoWallet?.hasNFTs
  const avatarClasses = classNames({
    [styles.avatar]: true,
    avatar: true, // global selector for overwirting
    [styles[`size${size}`]]: true,
    [styles.hasRing]: isCivicLiker || hasArchitectBadge,
    [styles.hasBadge]: hasLogbook,
  })

  const style = {
    '--avatar-ring-civic-liker': `url(${IMAGE_CIVIC_LIKER_RING})`,
    '--avatar-ring-architect': `url(${IMAGE_MATTERS_ARCHITECT_RING})`,
    '--avatar-ring-civic-architect': `url(${IMAGE_CIVIC_LIKER_MATTERS_ARCHITECT_RING})`,
  } as React.CSSProperties

  return (
    <div
      className={avatarClasses}
      style={style}
      title={title}
      data-test-id={TEST_ID.AVATAR}
    >
      <ResponsiveImage
        url={source}
        width={152}
        height={152}
        smUpWidth={240}
        smUpHeight={240}
        disabled={isFallback || inEditor}
        enableAnimation
      />

      {isCivicLiker && !hasArchitectBadge && (
        <span
          data-test-id={TEST_ID.AVATAR_CIVIC_LIKER}
          className={[styles.ring, styles.civicLiker].join(' ')}
        />
      )}
      {hasArchitectBadge && !isCivicLiker && (
        <span
          data-test-id={TEST_ID.AVATAR_ARCHITECT}
          className={[styles.ring, styles.architect].join(' ')}
        />
      )}
      {hasArchitectBadge && isCivicLiker && (
        <span
          data-test-id={TEST_ID.AVATAR_CIVIC_ARCHITECT}
          className={[styles.ring, styles.civicRrchitect].join(' ')}
        />
      )}
      {hasLogbook && (
        <section className={styles.badge} data-test-id={TEST_ID.AVATAR_LOGBOOK}>
          {inProfile ? (
            <Tooltip content="Logbook">
              <img
                className={styles.logbook}
                src={LOGBOOK.src}
                alt="logbook icon"
              />
            </Tooltip>
          ) : (
            <Icon icon={IconLogbook} />
          )}
        </section>
      )}
    </div>
  )
}

Avatar.fragments = fragments
Avatar.Placeholder = Placeholder
