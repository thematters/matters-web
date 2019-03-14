import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { Dropdown, Icon, PopperInstance } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Mutation } from '~/components/GQL'
import NoticeDigest from '~/components/NoticeDigest'

import ICON_NOTIFICATION from '~/static/icons/notification.svg?sprite'

import { MeDropdownNotifications } from './__generated__/MeDropdownNotifications'
import { UnreadNoticeCount } from './__generated__/UnreadNoticeCount'
import DropdownNotices from './DropdownNotices'
import styles from './styles.css'

const POLL_INTERVAL =
  process.env.NODE_ENV === 'production' ? 1000 * 10 : 1000 * 60

const UNREAD_NOTICE_COUNT = gql`
  query UnreadNoticeCount {
    viewer {
      id
      status {
        unreadNoticeCount
      }
    }
  }
`

const ME_NOTIFICATIONS = gql`
  query MeDropdownNotifications($cursor: String) {
    viewer {
      id
      notices(input: { first: 5, after: $cursor }) {
        edges {
          cursor
          node {
            ...DigestNotice
          }
        }
      }
    }
  }
  ${NoticeDigest.fragments.notice}
`

const MARK_ALL_NOTICES_AS_READ = gql`
  mutation markAllNoticesAsRead {
    markAllNoticesAsRead
  }
`

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
  const toggleDropdown = () => {
    if (!instance) {
      return
    }
    if (
      instance.state.isMounted ||
      instance.state.isShown ||
      instance.state.isVisible
    ) {
      instance.hide()
    } else {
      instance.show()
    }
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
      zIndex={101}
      distance={12}
      trigger="manual"
      onCreate={i => setInstance(i)}
      theme="dropdown shadow-light"
      onShown={() => {
        if (hasUnreadNotices) {
          markAllNoticesAsRead()
          refetch()
        }
      }}
    >
      <button
        type="button"
        aria-label="通知"
        onClick={() => {
          toggleDropdown()
        }}
        className={buttonClasses}
      >
        <Icon id={ICON_NOTIFICATION.id} viewBox={ICON_NOTIFICATION.viewBox} />
        <style jsx>{styles}</style>
      </button>
    </Dropdown>
  )
}

export default () => (
  <Query
    query={UNREAD_NOTICE_COUNT}
    pollInterval={POLL_INTERVAL}
    errorPolicy="none"
    skip={!process.browser}
  >
    {({ data: unreadCountData }: QueryResult & { data: UnreadNoticeCount }) => (
      <Query
        query={ME_NOTIFICATIONS}
        errorPolicy="none"
        notifyOnNetworkStatusChange
      >
        {({
          data,
          loading,
          error,
          refetch
        }: QueryResult & { data: MeDropdownNotifications }) => (
          <Mutation
            mutation={MARK_ALL_NOTICES_AS_READ}
            refetchQueries={[
              {
                query: UNREAD_NOTICE_COUNT
              }
            ]}
          >
            {markAllNoticesAsRead => (
              <NoticeButton
                data={data}
                loading={loading}
                error={error}
                refetch={refetch}
                hasUnreadNotices={
                  _get(unreadCountData, 'viewer.status.unreadNoticeCount', 0) >=
                  1
                }
                markAllNoticesAsRead={markAllNoticesAsRead}
              />
            )}
          </Mutation>
        )}
      </Query>
    )}
  </Query>
)
