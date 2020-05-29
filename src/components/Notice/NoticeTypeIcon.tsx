import classNames from 'classnames'

import {
  IconAvatarLogo,
  IconBookmark,
  IconComment,
  IconLike,
  IconUpVote,
  IconUser,
  IconVolume,
} from '~/components'

import styles from './styles.css'

type IconType =
  | 'appreciate'
  | 'bookmark'
  | 'comment'
  | 'logo'
  | 'user'
  | 'upvote'
  | 'volume'

const getIcon = (type: IconType) => {
  switch (type) {
    case 'appreciate':
      return <IconLike color="green" />
    case 'bookmark':
      return <IconBookmark color="green" />
    case 'comment':
      return <IconComment color="green" />
    case 'logo':
      return <IconAvatarLogo size="lg" />
    case 'user':
      return <IconUser color="green" size="lg" />
    case 'upvote':
      return <IconUpVote color="green" />
    case 'volume':
      return <IconVolume color="grey-dark" size="lg" />
  }
}

const NoticeTypeIcon = ({
  hasSpacing,
  type,
}: {
  hasSpacing?: boolean
  type: IconType
}) => {
  const icon = getIcon(type)

  const iconWrapClasses = classNames({
    'icon-wrap': hasSpacing,
  })

  return (
    <section className={iconWrapClasses}>
      {icon}
      <style jsx>{styles}</style>
    </section>
  )
}

export default NoticeTypeIcon
