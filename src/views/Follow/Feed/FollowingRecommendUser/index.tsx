import Link from 'next/link'
import React from 'react'
import { useVisuallyHidden } from 'react-aria'

import { toPath } from '~/common/utils'
import { Card, CardProps } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import {
  FollowingFeedRecommendUserPrivateFragment,
  FollowingFeedRecommendUserPublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type Props = {
  user: FollowingFeedRecommendUserPublicFragment &
    Partial<FollowingFeedRecommendUserPrivateFragment>
} & CardProps &
  AvatarProps

const RecommendUser = ({ user, ...cardProps }: Props) => {
  const { displayName, info } = user

  const { visuallyHiddenProps } = useVisuallyHidden()

  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  return (
    <Card
      bgActiveColor="none"
      borderRadius="xtight"
      spacing={[16, 16]}
      {...path}
      {...cardProps}
    >
      <section className={styles.container}>
        <section className={styles.head}>
          <Link {...path} className={styles.avatar}>
            <span {...visuallyHiddenProps}>{user.displayName}</span>
            <Avatar size={56} user={user} />
          </Link>

          <section className={styles.wrap}>
            <Link {...path} className={styles.name}>
              {displayName}
            </Link>

            <section className={styles.follow}>
              <FollowUserButton user={user} borderWidth="sm" />
            </section>
          </section>
        </section>

        <section className={styles.content}>
          {info.description && (
            <p className={styles.description}>{info.description}</p>
          )}
        </section>
      </section>
    </Card>
  )
}

type MemoizedRecommendUserType = React.MemoExoticComponent<React.FC<Props>> & {
  fragments: typeof fragments
}

const MemoizedRecommendUser = React.memo(
  RecommendUser,
  ({ user: prevUser }, { user }) => {
    return (
      prevUser.id === user.id &&
      prevUser.isFollowee === user.isFollowee &&
      prevUser.isFollower === user.isFollower
    )
  }
) as MemoizedRecommendUserType

MemoizedRecommendUser.fragments = fragments

export default MemoizedRecommendUser
