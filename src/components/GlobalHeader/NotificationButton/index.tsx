import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { forwardRef, useContext, useEffect } from 'react'

import {
  Button,
  ButtonProps,
  Dropdown,
  hidePopperOnClick,
  Icon,
  useResponsive,
  ViewerContext
} from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { useMutation } from '~/components/GQL'
import MARK_ALL_NOTICES_AS_READ from '~/components/GQL/mutations/markAllNoticesAsRead'
import {
  ME_NOTIFICATIONS,
  UNREAD_NOTICE_COUNT
} from '~/components/GQL/queries/notice'
import updateViewerUnreadNoticeCount from '~/components/GQL/updates/viewerUnreadNoticeCount'

import { PATHS, POLL_INTERVAL, Z_INDEX } from '~/common/enums'

import DropdownNotices from './DropdownNotices'
import styles from './styles.css'

import { MarkAllNoticesAsRead } from '~/components/GQL/mutations/__generated__/MarkAllNoticesAsRead'
import { MeNotifications } from '~/components/GQL/queries/__generated__/MeNotifications'
import { UnreadNoticeCount } from '~/components/GQL/queries/__generated__/UnreadNoticeCount'

type NoticeButtonProps = { unread?: boolean } & ButtonProps

const NoticeButton = forwardRef(
  ({ unread, ...restProps }: NoticeButtonProps, ref) => {
    const buttonContentClass = classNames({
      'notice-button-content': true,
      unread
    })

    return (
      <Button
        size={['2rem', '2rem']}
        bgHoverColor="grey-lighter"
        aria-label="通知"
        ref={ref}
        {...restProps}
      >
        <span className={buttonContentClass}>
          <Icon.NotificationLarge size="md" />

          <style jsx>{styles}</style>
        </span>
      </Button>
    )
  }
)

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
    if (viewer.isAuthed) {
      startPolling(POLL_INTERVAL)
    }
  }, [])

  const isSmallUp = useResponsive({ type: 'sm-up' })()
  const { headerState } = useContext(HeaderContext)
  const isDraft = headerState.type === 'draft'
  const unread =
    ((unreadCountData &&
      unreadCountData.viewer &&
      unreadCountData.viewer.status &&
      unreadCountData.viewer.status.unreadNoticeCount) ||
      0) >= 1

  if (!isSmallUp && isDraft) {
    return null
  }

  if (!isSmallUp) {
    return <NoticeButton unread={unread} {...PATHS.ME_NOTIFICATIONS} />
  }

  return (
    <Dropdown
      content={<DropdownNotices data={data} loading={loading} error={error} />}
      distance={12}
      theme="dropdown shadow-light"
      onShown={instance => {
        hidePopperOnClick(instance)

        if (unread) {
          markAllNoticesAsRead()
          refetch()
        }
      }}
      zIndex={Z_INDEX.OVER_GLOBAL_HEADER}
    >
      <NoticeButton unread={unread} aria-haspopup="true" />
    </Dropdown>
  )
}

export default NotificationButton
