import classNames from 'classnames'

import {
  IconAvatarLogo32,
  IconBookmark16,
  IconCircle16,
  IconClap16,
  IconComment16,
  IconUpVote16,
  IconUser16,
  IconVolume32,
} from '~/components'

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
      return <IconClap16 color="green" />
    case 'bookmark':
      return <IconBookmark16 color="green" />
    case 'comment':
      return <IconComment16 color="green" />
    case 'user':
      return <IconUser16 color="green" />
    case 'upvote':
      return <IconUpVote16 color="green" />
    case 'volume':
      return <IconVolume32 color="greyDark" size="lg" />
    case 'circle':
      return <IconCircle16 color="greyDark" />
    case 'logo':
      return <IconAvatarLogo32 size="lg" />
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
