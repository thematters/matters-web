import { VisuallyHidden } from '@reach/visually-hidden'
import Link from 'next/link'
import React from 'react'

import { toPath } from '~/common/utils'
import { Card, CardProps } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { FollowUserButton } from '~/components/Buttons/FollowUser'
import {
  FollowingFeedRecommendUserPrivateFragment,
  FollowingFeedRecommendUserPublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.css'

type Props = {
  user: FollowingFeedRecommendUserPublicFragment &
    Partial<FollowingFeedRecommendUserPrivateFragment>
} & CardProps &
  AvatarProps

const RecommendUser = ({ user, ...cardProps }: Props) => {
  const { displayName, info } = user

  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  return (
    <Card
      bgActiveColor="none"
      borderRadius="xtight"
      spacing={['base', 'base']}
      {...path}
      {...cardProps}
    >
      <section className="container">
        <section className="head">
          <Link {...path} legacyBehavior>
            <a className="avatar">
              <VisuallyHidden>
                <span>{user.displayName}</span>
              </VisuallyHidden>
              <Avatar size="xxl" user={user} />
            </a>
          </Link>

          <section className="wrap">
            <Link {...path} legacyBehavior>
              <a className="name">{displayName}</a>
            </Link>

            <section className="follow">
              <FollowUserButton user={user} />
            </section>
          </section>
        </section>

        <section className="content">
          {info.description && (
            <p className="description">{info.description}</p>
          )}
        </section>
      </section>

      <style jsx>{styles}</style>
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
