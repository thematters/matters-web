import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'

import IconNavNotifications from '@/public/static/icons/24px/nav-notifications.svg'
import IconNavNotificationsActive from '@/public/static/icons/24px/nav-notifications-active.svg'
import { Icon, ViewerContext } from '~/components'
import { UNREAD_NOTICE_COUNT } from '~/components/GQL/queries/notice'
import { UnreadNoticeCountQuery } from '~/gql/graphql'

import styles from './styles.module.css'

interface UnreadIconProps {
  active?: boolean
  iconSize?: 24 | 26 | 28 | 30
}

const FEDIVERSE_UNREAD_COUNT = gql`
  query FediverseUnreadCount {
    viewerFediverseUnreadCount
  }
`

const NotificationUnreadIcon: React.FC<UnreadIconProps> = ({
  active,
  iconSize = 24,
}) => {
  const viewer = useContext(ViewerContext)
  const { data, startPolling, stopPolling } = useQuery<UnreadNoticeCountQuery>(
    UNREAD_NOTICE_COUNT,
    {
      errorPolicy: 'ignore',
      fetchPolicy: 'network-only',
      skip: !viewer.isAuthed || typeof window === 'undefined',
    }
  )
  const federationEnabled = viewer.federationSetting?.state === 'enabled'
  const {
    data: federationData,
    startPolling: startFederationPolling,
    stopPolling: stopFederationPolling,
  } = useQuery<{
    viewerFediverseUnreadCount: number
  }>(FEDIVERSE_UNREAD_COUNT, {
    errorPolicy: 'ignore',
    fetchPolicy: 'network-only',
    skip:
      !viewer.isAuthed || !federationEnabled || typeof window === 'undefined',
  })

  // FIXME: https://github.com/apollographql/apollo-client/issues/3775
  useEffect(() => {
    if (viewer.isAuthed) {
      startPolling(1000 * 20) // 20s
      if (federationEnabled) {
        startFederationPolling(1000 * 60) // 60s
      }
    }
    return () => {
      stopPolling()
      stopFederationPolling()
    }
  }, [
    federationEnabled,
    startFederationPolling,
    startPolling,
    stopFederationPolling,
    stopPolling,
    viewer.isAuthed,
  ])

  const unread =
    (data?.viewer?.status?.unreadNoticeCount || 0) >= 1 ||
    (federationData?.viewerFediverseUnreadCount || 0) >= 1
  const iconClasses = classNames({
    [styles.unreadIcon]: true,
    [styles.unread]: unread,
  })
  const icon = active ? IconNavNotificationsActive : IconNavNotifications

  return (
    <span className={iconClasses}>
      <Icon icon={icon} size={iconSize} />
    </span>
  )
}

export default NotificationUnreadIcon
