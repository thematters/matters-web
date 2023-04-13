import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import {
  IconNavFollowing32,
  IconNavFollowingActive32,
  ViewerContext,
} from '~/components'
import UNREAD_FOLLOWING from '~/components/GQL/queries/unreadFollowing'
import { UnreadFollowingQuery } from '~/gql/graphql'

import styles from './styles.css'

interface FollowUnreadIconProps {
  active?: boolean
}

const FollowUnreadIcon: React.FC<FollowUnreadIconProps> = ({ active }) => {
  const viewer = useContext(ViewerContext)
  const { data, startPolling } = useQuery<UnreadFollowingQuery>(
    UNREAD_FOLLOWING,
    {
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: !viewer.isAuthed || typeof window === 'undefined',
    }
  )

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
        <IconNavFollowingActive32 size="lg" />
      ) : (
        <IconNavFollowing32 size="lg" />
      )}

      <style jsx>{styles}</style>
    </span>
  )
}

export default FollowUnreadIcon
