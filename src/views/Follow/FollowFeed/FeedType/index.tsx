import { Tabs, Translate } from '~/components'

export type FollowFeedType = 'article' | 'comment' | 'tag' | 'donation'

interface FeedTypeProps {
  type: FollowFeedType
  setFeedType: (type: FollowFeedType) => void
}

const FeedType: React.FC<FeedTypeProps> = ({ type, setFeedType }) => {
  const isArticle = type === 'article'
  const isComment = type === 'comment'
  const isTag = type === 'tag'
  const isDonation = type === 'donation'

  return (
    <Tabs sticky>
      <Tabs.Tab onClick={() => setFeedType('article')} selected={isArticle}>
        <Translate id="article" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setFeedType('comment')} selected={isComment}>
        <Translate id="comment" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setFeedType('tag')} selected={isTag}>
        <Translate id="tag" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setFeedType('donation')} selected={isDonation}>
        <Translate zh_hant="支持" zh_hans="支持" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default FeedType
