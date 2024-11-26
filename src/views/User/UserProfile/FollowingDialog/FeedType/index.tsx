import { Tabs, Translate } from '~/components'

export type FollowingFeedType = 'user' | 'circle' | 'tag'

import styles from './styles.module.css'

interface FeedTypeProps {
  type: FollowingFeedType
  setFeedType: (type: FollowingFeedType) => void
}

const FeedType = ({ type, setFeedType }: FeedTypeProps) => {
  const isCircle = type === 'circle'
  const isUser = type === 'user'

  return (
    <section className={styles.container}>
      <Tabs>
        <Tabs.Tab onClick={() => setFeedType('user')} selected={isUser}>
          <Translate zh_hant="作者" zh_hans="作者" en="Authors" />
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setFeedType('circle')} selected={isCircle}>
          <Translate zh_hant="圍爐" zh_hans="围炉" en="Circles" />
        </Tabs.Tab>
      </Tabs>
    </section>
  )
}

export default FeedType
