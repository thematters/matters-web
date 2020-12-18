import classNames from 'classnames'

import {
  IconActionBookmark16,
  IconActionClap16,
  IconActionComment16,
  IconActionUpVote16,
  IconAvatarLogo32,
  IconUser16,
  IconVolume16,
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
      return <IconActionClap16 color="green" />
    case 'bookmark':
      return <IconActionBookmark16 color="green" />
    case 'comment':
      return <IconActionComment16 color="green" />
    case 'logo':
      return <IconAvatarLogo32 size="lg" />
    case 'user':
      return <IconUser16 color="green" size="lg" />
    case 'upvote':
      return <IconActionUpVote16 color="green" />
    case 'volume':
      return <IconVolume16 color="grey-dark" size="lg" />
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
