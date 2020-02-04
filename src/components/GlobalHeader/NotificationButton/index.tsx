import { useQuery } from '@apollo/react-hooks'
import { useContext, useEffect, useState } from 'react'

import {
  Button,
  Dropdown,
  Icon,
  PopperInstance,
  useResponsive
} from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { useMutation } from '~/components/GQL'
import MARK_ALL_NOTICES_AS_READ from '~/components/GQL/mutations/markAllNoticesAsRead'
import {
  ME_NOTIFICATIONS,
  UNREAD_NOTICE_COUNT
} from '~/components/GQL/queries/notice'
import updateViewerUnreadNoticeCount from '~/components/GQL/updates/viewerUnreadNoticeCount'
import { ViewerContext } from '~/components/Viewer'

import { POLL_INTERVAL } from '~/common/enums'

import DropdownNotices from './DropdownNotices'
import styles from './styles.css'

import { MarkAllNoticesAsRead } from '~/components/GQL/mutations/__generated__/MarkAllNoticesAsRead'
import { MeNotifications } from '~/components/GQL/queries/__generated__/MeNotifications'
import { UnreadNoticeCount } from '~/components/GQL/queries/__generated__/UnreadNoticeCount'

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
  hasUnreadNotices: boolean
  refetch: any
  markAllNoticesAsRead: any
}) => {
  const isSmallDown = useResponsive({ type: 'sm-down' })()
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  const { headerState } = useContext(HeaderContext)
  const isDraft = headerState.type === 'draft'

  if (isSmallDown && isDraft) {
    return null
  }

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
      <Button
        size={['2rem', '2rem']}
        bgHoverColor="grey-lighter"
        aria-label="通知"
        aria-haspopup="true"
      >
        <span className={hasUnreadNotices ? 'unread' : undefined}>
          <Icon.NotificationLarge size="md" />

          <style jsx>{styles}</style>
        </span>
      </Button>
    </Dropdown>
  )
}

const NotificationButton = () => {
  const viewer = useContext(ViewerContext)
  const { data: unreadCountData, startPolling } = useQuery<UnreadNoticeCount>(
    UNREAD_NOTICE_COUNT,
    {
      errorPolicy: 'ignore',
      fetchPolicy: 'network-only',
      skip: !viewer.isAuthed || !process.browser
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
