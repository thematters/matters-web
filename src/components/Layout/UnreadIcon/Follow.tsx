import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { useContext, useEffect } from 'react'

import { ReactComponent as IconNavFollowing } from '@/public/static/icons/24px/nav-following.svg'
import { ReactComponent as IconNavFollowingActive } from '@/public/static/icons/24px/nav-following-active.svg'
import { Icon, ViewerContext } from '~/components'
import UNREAD_FOLLOWING from '~/components/GQL/queries/unreadFollowing'
import { UnreadFollowingQuery } from '~/gql/graphql'

import styles from './styles.module.css'

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
      startPolling(1000 * 60 * 3) // 3 mins
    }
  }, [])

  const unread = data?.viewer?.status?.unreadFollowing
  const iconClasses = classNames({
    [styles.unreadIcon]: true,
    [styles.unread]: unread,
  })

  return (
    <span className={iconClasses}>
      {active ? (
        <Icon icon={IconNavFollowingActive} size="lg" />
      ) : (
        <Icon icon={IconNavFollowing} size="lg" />
      )}
    </span>
  )
}

export default FollowUnreadIcon
