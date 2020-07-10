import { useQuery } from '@apollo/react-hooks'

import { Head } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import ArticlesFeed from './ArticlesFeed'
import CommentsFeed from './CommentsFeed'
import FeedType, { FollowFeedType } from './FeedType'
import TagsFeed from './TagsFeed'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

const FollowFeed = () => {
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const { followFeedType } = data?.clientPreference || {
    followFeedType: 'article',
  }
  const setFeedType = (type: FollowFeedType) => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { followFeedType: type },
      })
    }
  }

  return (
    <>
      <Head title={{ id: 'follow' }} />
      <section className="topbar">
        <FeedType
          type={followFeedType as FollowFeedType}
          setFeedType={setFeedType}
        />
      </section>
      {followFeedType === 'article' && <ArticlesFeed />}
      {followFeedType === 'comment' && <CommentsFeed />}
      {followFeedType === 'tag' && <TagsFeed />}
    </>
  )
}

export default FollowFeed
