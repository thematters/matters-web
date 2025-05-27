import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import IconNavNotifications from '@/public/static/icons/24px/nav-notifications.svg'
import IconNavNotificationsActive from '@/public/static/icons/24px/nav-notifications-active.svg'
import { Icon, ViewerContext } from '~/components'
import { UNREAD_NOTICE_COUNT } from '~/components/GQL/queries/notice'
import { UnreadNoticeCountQuery } from '~/gql/graphql'

import styles from './styles.module.css'

interface UnreadIconProps {
  active?: boolean
}

const NotificationUnreadIcon: React.FC<UnreadIconProps> = ({ active }) => {
  const viewer = useContext(ViewerContext)
  const { data, startPolling } = useQuery<UnreadNoticeCountQuery>(
    UNREAD_NOTICE_COUNT,
    {
      errorPolicy: 'ignore',
      fetchPolicy: 'network-only',
      skip: !viewer.isAuthed || typeof window === 'undefined',
    }
  )

  // FIXME: https://github.com/apollographql/apollo-client/issues/3775
  useEffect(() => {
    if (viewer.isAuthed) {
      startPolling(1000 * 20) // 20s
    }
  }, [])

  const unread = (data?.viewer?.status?.unreadNoticeCount || 0) >= 1
  const iconClasses = classNames({
    [styles.unreadIcon]: true,
    [styles.unread]: unread,
  })

  return (
    <span className={iconClasses}>
      {active ? (
        <Icon icon={IconNavNotificationsActive} size={32} />
      ) : (
        <Icon icon={IconNavNotifications} size={32} />
      )}
    </span>
  )
}

export default NotificationUnreadIcon
