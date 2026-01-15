import Link from 'next/link'

import IconLogoGraph from '@/public/static/icons/logo-graph.svg'
import IMAGE_NOTICE_APPRECIATION from '@/public/static/images/notice-appreciation.svg?url'
import IMAGE_NOTICE_CIRCLE from '@/public/static/images/notice-circle.svg?url'
import IMAGE_NOTICE_COMMENT from '@/public/static/images/notice-comment.svg?url'
import IMAGE_NOTICE_LIKE from '@/public/static/images/notice-like.svg?url'
import IMAGE_NOTICE_TX from '@/public/static/images/notice-tx.svg?url'
import IMAGE_NOTICE_USER from '@/public/static/images/notice-user.svg?url'
import { toPath } from '~/common/utils'
import { Avatar, Icon } from '~/components'
import { NoticeActorAvatarUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'

type ActorAvatarProps = {
  actors: NoticeActorAvatarUserFragment[]
  type: string
}

const ActorAvatar = ({ actors, type }: ActorAvatarProps) => {
  const actor = actors[0]
  const iconSize = 40

  const style = {
    '--avatar-notice-appreciation': `url(${IMAGE_NOTICE_APPRECIATION.src})`,
    '--avatar-notice-circle': `url(${IMAGE_NOTICE_CIRCLE.src})`,
    '--avatar-notice-comment': `url(${IMAGE_NOTICE_COMMENT.src})`,
    '--avatar-notice-like': `url(${IMAGE_NOTICE_LIKE.src})`,
    '--avatar-notice-tx': `url(${IMAGE_NOTICE_TX.src})`,
    '--avatar-notice-user': `url(${IMAGE_NOTICE_USER.src})`,
  } as React.CSSProperties

  const isAppreciation = type === 'appreciation'
  const isCircle = type === 'circle'
  const isComment = type === 'comment'
  const isLike = type === 'like'
  const isSystem = type === 'system'
  const isTx = type === 'transaction'
  const isUser = type === 'user'

  const typeStyles = isUser
    ? [styles.ring, styles.noticeUser]
    : isAppreciation
      ? [styles.ring, styles.noticeAppreciation]
      : isCircle
        ? [styles.ring, styles.noticeCircle]
        : isComment
          ? [styles.ring, styles.noticeComment]
          : isLike
            ? [styles.ring, styles.noticeLike]
            : isTx
              ? [styles.ring, styles.noticeTx]
              : []

  const path = toPath({
    page: 'userProfile',
    userName: actor?.userName || '',
  })

  return (
    <>
      {isSystem && <Icon icon={IconLogoGraph} size={iconSize} />}
      {!isSystem && (
        <Link {...path} className={styles.container} style={style}>
          <Avatar size={iconSize} user={actor} />

          <span className={typeStyles.join(' ')} />
        </Link>
      )}
    </>
  )
}

export default ActorAvatar
