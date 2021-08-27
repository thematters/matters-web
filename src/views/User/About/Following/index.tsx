import { useState } from 'react'

import FeedType, { FollowingFeedType } from './FeedType'
import styles from './styles.css'
import Tags from './Tags'
import Users from './Users'

import { FollowingFeedTypeUser } from './FeedType/__generated__/FollowingFeedTypeUser'

type FollowingProps = {
  user: FollowingFeedTypeUser
}

const Following = ({ user }: FollowingProps) => {
  const [feedType, setFeedType] = useState<FollowingFeedType>('user')

  return (
    <section className="container">
      <FeedType user={user} type={feedType} setFeedType={setFeedType} />

      {feedType === 'tag' && <Tags />}
      {feedType === 'user' && <Users />}

      <style jsx>{styles}</style>
    </section>
  )
}

Following.fragments = FeedType.fragments

export default Following
