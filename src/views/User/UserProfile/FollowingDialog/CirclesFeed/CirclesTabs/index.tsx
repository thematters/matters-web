import { useIntl } from 'react-intl'

import { HorizontalRule, SquareTabs } from '~/components'

import styles from './styles.module.css'

export type CirclesFeedType = 'following' | 'subscribed'

interface CirclesFeedTypeProps {
  type: CirclesFeedType
  setFeedType: (type: CirclesFeedType) => void
}

const CirclesTabs = ({ type, setFeedType }: CirclesFeedTypeProps) => {
  const intl = useIntl()
  const isFollowing = type === 'following'
  const isSubscribed = type === 'subscribed'

  return (
    <section className={styles.tabs}>
      <SquareTabs spacing="sm">
        <SquareTabs.Tab
          onClick={() => setFeedType('following')}
          selected={isFollowing}
          title={intl.formatMessage({
            defaultMessage: 'Followed',
            id: 'nVoVnb',
            description:
              'src/views/User/UserProfile/FollowingDialog/CirclesFeed/CirclesTabs/index.tsx',
          })}
        />

        <SquareTabs.Tab
          onClick={() => setFeedType('subscribed')}
          selected={isSubscribed}
          title={intl.formatMessage({
            defaultMessage: 'Subscribed',
            id: 'mBmmr+',
            description:
              'src/views/User/UserProfile/FollowingDialog/CirclesFeed/CirclesTabs/index.tsx',
          })}
        />
      </SquareTabs>
      <HorizontalRule />
    </section>
  )
}

export default CirclesTabs
