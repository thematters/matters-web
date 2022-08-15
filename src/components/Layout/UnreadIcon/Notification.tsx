import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import {
  IconNavNotification24,
  IconNavNotificationActive24,
  ViewerContext,
} from '~/components'
import { UNREAD_NOTICE_COUNT } from '~/components/GQL/queries/notice'

import styles from './styles.css'

import { UnreadNoticeCount } from '~/components/GQL/queries/__generated__/UnreadNoticeCount'

interface UnreadIconProps {
  active?: boolean
}

const NotificationUnreadIcon: React.FC<UnreadIconProps> = ({ active }) => {
  const viewer = useContext(ViewerContext)
  const { data, startPolling } = useQuery<UnreadNoticeCount>(
    UNREAD_NOTICE_COUNT,
    {
      errorPolicy: 'ignore',
      fetchPolicy: 'network-only',
      skip: !viewer.isAuthed || !typeof window,
    }
  )

  // FIXME: https://github.com/apollographql/apollo-client/issues/3775
  useEffect(() => {
    if (viewer.isAuthed) {
      startPolling(1000 * 20) // 20s
    }
  }, [])

  const unread = (data?.viewer?.status?.unreadNoticeCount || 0) >= 1
  const iconClasses = classNames({ 'unread-icon': true, unread })

  return (
    <span className={iconClasses}>
      {active ? (
        <IconNavNotificationActive24 size="md" color="green" />
      ) : (
        <IconNavNotification24 size="md" />
      )}

      <style jsx>{styles}</style>
    </span>
  )
}

export default NotificationUnreadIcon
