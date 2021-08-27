import { Tabs, Translate } from '~/components'

import { numAbbr } from '@/src/common/utils'

import { fragments } from './gql'

import { FollowingFeedTypeUser } from './__generated__/FollowingFeedTypeUser'

export type FollowingFeedType = 'user' | 'tag'

interface FeedTypeProps {
  user: FollowingFeedTypeUser
  type: FollowingFeedType
  setFeedType: (type: FollowingFeedType) => void
}

const FeedType = ({ user, type, setFeedType }: FeedTypeProps) => {
  const isTag = type === 'tag'
  const isUser = type === 'user'

  return (
    <Tabs sticky>
      <Tabs.Tab
        onClick={() => setFeedType('user')}
        selected={isUser}
        count={numAbbr(user.following.users.totalCount)}
      >
        <Translate
          zh_hant="追蹤的用戶"
          zh_hans="追踪的用戶"
          en="Following Users"
        />
      </Tabs.Tab>

      <Tabs.Tab
        onClick={() => setFeedType('tag')}
        selected={isTag}
        count={numAbbr(user.following.tags.totalCount)}
      >
        <Translate
          zh_hant="追蹤的標籤"
          zh_hans="追踪的标签"
          en="Following Tags"
        />
      </Tabs.Tab>
    </Tabs>
  )
}

FeedType.fragments = fragments

export default FeedType
