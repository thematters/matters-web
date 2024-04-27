import classNames from 'classnames'

import { ReactComponent as IconCircle } from '@/public/static/icons/24px/circle.svg'
import { ReactComponent as IconClap } from '@/public/static/icons/24px/clap.svg'
import { ReactComponent as IconComment } from '@/public/static/icons/24px/comment.svg'
import { ReactComponent as IconLatest } from '@/public/static/icons/24px/latest.svg'
import { ReactComponent as IconSave } from '@/public/static/icons/24px/save.svg'
import { ReactComponent as IconUser } from '@/public/static/icons/24px/user.svg'
import { ReactComponent as IconVoteUp } from '@/public/static/icons/24px/vote-up.svg'
import { ReactComponent as IconAvatarLogo } from '@/public/static/icons/avatar-logo.svg'
import { Icon } from '~/components'

import styles from './styles.module.css'

type IconType =
  | 'appreciate'
  | 'bookmark'
  | 'comment'
  | 'logo'
  | 'user'
  | 'upvote'
  | 'volume'
  | 'circle'

const getIcon = (type: IconType) => {
  switch (type) {
    case 'appreciate':
      return <Icon icon={IconClap} color="green" />
    case 'bookmark':
      return <Icon icon={IconSave} color="green" />
    case 'comment':
      return <Icon icon={IconComment} color="green" />
    case 'user':
      return <Icon icon={IconUser} color="green" />
    case 'upvote':
      return <Icon icon={IconVoteUp} color="green" />
    case 'volume':
      return <Icon icon={IconLatest} color="greyDark" size="lg" />
    case 'circle':
      return <Icon icon={IconCircle} color="greyDark" />
    case 'logo':
      return <Icon icon={IconAvatarLogo} size="lg" />
  }
}

const NoticeTypeIcon = ({ type }: { type: IconType }) => {
  const icon = getIcon(type)

  const iconWrapClasses = classNames({
    [styles.iconWrap]: ['logo', 'volume'].indexOf(type) < 0,
  })

  return <section className={iconWrapClasses}>{icon}</section>
}

export default NoticeTypeIcon
