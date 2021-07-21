import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import {
  IconNavFollowing24,
  IconNavFollowingActive24,
  ViewerContext,
} from '~/components'
import UNREAD_FOLLOWING from '~/components/GQL/queries/unreadFollowing'

import styles from './styles.css'

import { UnreadFollowing } from '~/components/GQL/queries/__generated__/UnreadFollowing'

interface FollowUnreadIconProps {
  active?: boolean
}

const FollowUnreadIcon: React.FC<FollowUnreadIconProps> = ({ active }) => {
  const viewer = useContext(ViewerContext)
  const { data, startPolling } = useQuery<UnreadFollowing>(UNREAD_FOLLOWING, {
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !viewer.isAuthed || !process.browser,
  })

  // FIXME: https://github.com/apollographql/apollo-client/issues/3775
  useEffect(() => {
    if (viewer.isAuthed) {
      startPolling(1000 * 60) // 60s
    }
  }, [])

  const unread = data?.viewer?.status?.unreadFollowing
  const iconClasses = classNames({ 'unread-icon': true, unread })

  return (
    <span className={iconClasses}>
      {active ? (
        <IconNavFollowingActive24 size="md" color="green" />
      ) : (
        <IconNavFollowing24 size="md" />
      )}

      <style jsx>{styles}</style>
    </span>
  )
}

export default FollowUnreadIcon
