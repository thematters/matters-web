import { HorizontalRule, SegmentedTabs, Translate } from '~/components'

import styles from './styles.module.css'

export type CirclesFeedType = 'following' | 'subscribed'

interface CirclesFeedTypeProps {
  type: CirclesFeedType
  setFeedType: (type: CirclesFeedType) => void
}

const CirclesTabs = ({ type, setFeedType }: CirclesFeedTypeProps) => {
  const isFollowing = type === 'following'
  const isSubscribed = type === 'subscribed'

  return (
    <>
      <section className={styles.tabs}>
        <SegmentedTabs>
          <SegmentedTabs.Tab
            onClick={() => setFeedType('following')}
            selected={isFollowing}
          >
            <Translate zh_hant="追蹤" zh_hans="关注" en="Followed" />
          </SegmentedTabs.Tab>

          <SegmentedTabs.Tab
            onClick={() => setFeedType('subscribed')}
            selected={isSubscribed}
          >
            <Translate zh_hant="訂閱" zh_hans="订阅" en="Subscribed" />
          </SegmentedTabs.Tab>
        </SegmentedTabs>
        <HorizontalRule />
      </section>
    </>
  )
}

export default CirclesTabs
