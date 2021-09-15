import { Tabs, Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import { UserLanding_user } from './__generated__/UserLanding'

export type FeedType = 'topics' | 'articles'

type UserTabsProps = {
  user: UserLanding_user
  feed: FeedType
  setFeed: (type: FeedType) => void
}

const UserTabs: React.FC<UserTabsProps> = ({ user, feed, setFeed }) => {
  const articleCount = user.articles.totalCount
  const topicCount = user.topics.totalCount
  const hasTopics = topicCount > 0

  if (hasTopics) {
    return (
      <Tabs sticky>
        <Tabs.Tab
          selected={feed === 'topics'}
          count={numAbbr(topicCount)}
          onClick={() => setFeed('topics')}
        >
          <Translate zh_hant="主題" zh_hans="主题" en="Topics" />
        </Tabs.Tab>
        <Tabs.Tab
          selected={feed === 'articles'}
          count={numAbbr(articleCount)}
          onClick={() => setFeed('articles')}
        >
          <Translate zh_hant="全部" zh_hans="全部" en="All" />
        </Tabs.Tab>
      </Tabs>
    )
  }

  return (
    <Tabs>
      <Tabs.Tab
        selected={feed === 'articles'}
        count={numAbbr(articleCount)}
        plain
      >
        <Translate zh_hant="所有作品" zh_hans="所有作品" en="All Articles" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserTabs
