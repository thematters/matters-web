import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { Icon, ViewerContext } from '~/components'
import UNREAD_FOLLOWEE_ARTICLES from '~/components/GQL/queries/unreadFolloweeArticles'

import { POLL_INTERVAL } from '~/common/enums'

import styles from './styles.css'

import { UnreadFolloweeArticles } from '~/components/GQL/queries/__generated__/UnreadFolloweeArticles'

interface FollowUnreadIconProps {
  active?: boolean
}

const FollowUnreadIcon: React.FC<FollowUnreadIconProps> = ({ active }) => {
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
      {active ? (
        <Icon.FollowActiveLarge size="lg" color="green" />
      ) : (
        <Icon.FollowLarge size="lg" />
      )}

      <style jsx>{styles}</style>
    </span>
  )
}

export default FollowUnreadIcon
