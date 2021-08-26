import { useState } from 'react'

import FeedType, { FollowingFeedType } from './FeedType'
import styles from './styles.css'
import Tags from './Tags'
import Users from './Users'

const Following = () => {
  const [feedType, setFeedType] = useState<FollowingFeedType>('user')

  return (
    <section className="container">
      <FeedType type={feedType} setFeedType={setFeedType} />

      {feedType === 'tag' && <Tags />}
      {feedType === 'user' && <Users />}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Following
