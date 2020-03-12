import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { Icon, IconProps, ViewerContext } from '~/components'
import UNREAD_FOLLOWEE_ARTICLES from '~/components/GQL/queries/unreadFolloweeArticles'

import { POLL_INTERVAL } from '~/common/enums'

import styles from './styles.css'

import { UnreadFolloweeArticles } from '~/components/GQL/queries/__generated__/UnreadFolloweeArticles'

const FollowUnreadIcon: React.FC<IconProps> = iconProps => {
  const viewer = useContext(ViewerContext)
  const { data, startPolling } = useQuery<UnreadFolloweeArticles>(
    UNREAD_FOLLOWEE_ARTICLES,
    {
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: !viewer.isAuthed || !process.browser
    }
  )

  // FIXME: https://github.com/apollographql/apollo-client/issues/3775
  useEffect(() => {
    if (viewer.isAuthed) {
      startPolling(POLL_INTERVAL)
    }
  }, [])

  const unread = data?.viewer?.status?.unreadFolloweeArticles
  const iconClass = classNames({ 'unread-icon': true, unread })

  return (
    <span className={iconClass}>
      <Icon.FollowLarge {...iconProps} />

      <style jsx>{styles}</style>
    </span>
  )
}

export default FollowUnreadIcon
