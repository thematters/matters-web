import { useQuery } from '@apollo/client'

import { Head, Spacer } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import ArticlesFeed from './ArticlesFeed'
import CommentsFeed from './CommentsFeed'
import DonationsFeed from './DonationsFeed'
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
      client.writeQuery({
        query: CLIENT_PREFERENCE,
        id: 'ClientPreference:local',
        data: { followFeedType: type },
      })
    }
  }

  return (
    <>
      <Head title={{ id: 'follow' }} />

      <Spacer size="xtight" />

      <FeedType
        type={followFeedType as FollowFeedType}
        setFeedType={setFeedType}
      />

      {followFeedType === 'article' && <ArticlesFeed />}
      {followFeedType === 'comment' && <CommentsFeed />}
      {followFeedType === 'tag' && <TagsFeed />}
      {followFeedType === 'donation' && <DonationsFeed />}
    </>
  )
}

export default FollowFeed
