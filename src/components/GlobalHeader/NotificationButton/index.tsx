import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'

import { Dropdown, Icon, PopperInstance } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { useMutation } from '~/components/GQL'
import { MarkAllNoticesAsRead } from '~/components/GQL/mutations/__generated__/MarkAllNoticesAsRead'
import MARK_ALL_NOTICES_AS_READ from '~/components/GQL/mutations/markAllNoticesAsRead'
import { MeNotifications } from '~/components/GQL/queries/__generated__/MeNotifications'
import { UnreadNoticeCount } from '~/components/GQL/queries/__generated__/UnreadNoticeCount'
import {
  ME_NOTIFICATIONS,
  UNREAD_NOTICE_COUNT
} from '~/components/GQL/queries/notice'
import updateViewerUnreadNoticeCount from '~/components/GQL/updates/viewerUnreadNoticeCount'

import { POLL_INTERVAL } from '~/common/enums'
import ICON_NOTIFICATION from '~/static/icons/notification.svg?sprite'

import DropdownNotices from './DropdownNotices'
import styles from './styles.css'

const NoticeButton = ({
  data,
  loading,
  error,
  hasUnreadNotices,
  refetch,
  markAllNoticesAsRead
}: {
  data?: MeNotifications
  loading: boolean
  error: any
  hasUnreadNotices: any
  refetch: any
  markAllNoticesAsRead: any
}) => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  const { headerState } = useContext(HeaderContext)
  const isDraft = headerState.type === 'draft'
  const buttonClasses = classNames({
    hasUnreadNotices,
    unread: hasUnreadNotices,
    'u-sm-down-hide': isDraft
  })

  return (
    <Dropdown
      content={
        <DropdownNotices
          hideDropdown={hideDropdown}
          data={data}
          loading={loading}
          error={error}
        />
      }
      distance={12}
      trigger="click"
      onCreate={setInstance}
      theme="dropdown shadow-light"
      onShown={() => {
        if (hasUnreadNotices) {
          markAllNoticesAsRead()
          refetch()
        }
      }}
    >
      <button type="button" aria-label="通知" className={buttonClasses}>
        <Icon id={ICON_NOTIFICATION.id} viewBox={ICON_NOTIFICATION.viewBox} />

        <style jsx>{styles}</style>
      </button>
    </Dropdown>
  )
}

const NotificationButton = () => {
  const { data: unreadCountData, startPolling } = useQuery<UnreadNoticeCount>(
    UNREAD_NOTICE_COUNT,
    {
      errorPolicy: 'ignore',
      fetchPolicy: 'network-only',
      skip: !process.browser
    }
  )
  const { data, loading, error, refetch } = useQuery<MeNotifications>(
    ME_NOTIFICATIONS,
    {
      variables: { first: 5 },
      errorPolicy: 'ignore',
      notifyOnNetworkStatusChange: true
    }
  )
  const [markAllNoticesAsRead] = useMutation<MarkAllNoticesAsRead>(
    MARK_ALL_NOTICES_AS_READ,
    {
      update: updateViewerUnreadNoticeCount
    }
  )

  // FIXME: https://github.com/apollographql/apollo-client/issues/3775
  useEffect(() => {
    startPolling(POLL_INTERVAL)
  }, [])

  return (
    <NoticeButton
      data={data}
      loading={loading}
      error={error}
      refetch={refetch}
      hasUnreadNotices={
        ((unreadCountData &&
          unreadCountData.viewer &&
          unreadCountData.viewer.status &&
          unreadCountData.viewer.status.unreadNoticeCount) ||
          0) >= 1
      }
      markAllNoticesAsRead={markAllNoticesAsRead}
    />
  )
}

export default NotificationButton
