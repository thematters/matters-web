import { Tabs, Translate } from '~/components'

export type FollowFeedType = 'article' | 'comment'

interface FeedTypeProps {
  type: FollowFeedType
  setFeedType: (type: FollowFeedType) => void
}

const FeedType: React.FC<FeedTypeProps> = ({ type, setFeedType }) => {
  const isArticle = type === 'article'
  const isComment = type === 'comment'

  return (
    <Tabs>
      <Tabs.Tab onClick={() => setFeedType('article')} selected={isArticle}>
        <Translate id="article" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setFeedType('comment')} selected={isComment}>
        <Translate id="comment" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default FeedType
