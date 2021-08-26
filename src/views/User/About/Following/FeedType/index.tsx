import { Tabs, Translate } from '~/components'

export type FollowingFeedType = 'user' | 'tag'

interface FeedTypeProps {
  type: FollowingFeedType
  setFeedType: (type: FollowingFeedType) => void
}

const FeedType = ({ type, setFeedType }: FeedTypeProps) => {
  const isTag = type === 'tag'
  const isUser = type === 'user'

  return (
    <Tabs sticky>
      <Tabs.Tab onClick={() => setFeedType('user')} selected={isUser}>
        <Translate
          zh_hant="追蹤的用戶"
          zh_hans="追踪的用戶"
          en="Following Users"
        />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setFeedType('tag')} selected={isTag}>
        <Translate
          zh_hant="追蹤的標籤"
          zh_hans="追踪的标签"
          en="Following Tags"
        />
      </Tabs.Tab>
    </Tabs>
  )
}

export default FeedType
