import classNames from 'classnames'
import _get from 'lodash/get'
import { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import { Dropdown, Icon, PopperInstance } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import MARK_ALL_NOTICES_AS_READ from '~/components/GQL/mutations/markAllNoticesAsRead'
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
  data: any
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

export default () => {
  const { data } = useQuery(UNREAD_NOTICE_COUNT, {
    pollInterval: POLL_INTERVAL,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser
  })
  const { data: unreadCountData, loading, error, refetch } = useQuery(
    ME_NOTIFICATIONS,
    {
      variables: { first: 5 },
      errorPolicy: 'none',
      notifyOnNetworkStatusChange: true
    }
  )
  const [markAllNoticesAsRead] = useMutation(MARK_ALL_NOTICES_AS_READ, {
    update: updateViewerUnreadNoticeCount
  })

  return (
    <NoticeButton
      data={data}
      loading={loading}
      error={error}
      refetch={refetch}
      hasUnreadNotices={
        _get(unreadCountData, 'viewer.status.unreadNoticeCount', 0) >= 1
      }
      markAllNoticesAsRead={markAllNoticesAsRead}
    />
  )
}
