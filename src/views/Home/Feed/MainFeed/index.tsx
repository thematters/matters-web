import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { Media, Spacer, ViewerContext } from '~/components'
import { useRoute } from '~/components'

import Announcements from '../../Announcements'
import Authors from '../Authors'
import Billboard from '../Billboard'
import FeedRenderer from '../components/FeedRenderer'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC } from '../gql'
import { useFeed } from '../hooks/useFeed'
import { IcymiCuratedFeed } from '../IcymiCuratedFeed'
import { FeedType } from '../index'
import styles from '../styles.module.css'
import Tags from '../Tags'

const horizontalFeeds: Record<
  number,
  React.FC<{ after?: string; first?: number }>
> = {
  3: () => (
    <Media lessThan="lg">
      <Billboard />
    </Media>
  ),
  11: () => (
    <Media lessThan="lg">
      <Authors />
    </Media>
  ),
  17: () => (
    <Media lessThan="lg">
      <Tags />
    </Media>
  ),
}

interface MainFeedProps {
  feedType?: FeedType
}

const MainFeed: React.FC<MainFeedProps> = ({ feedType: propFeedType }) => {
  const viewer = useContext(ViewerContext)
  const { getQuery, isInPath } = useRoute()
  const type = getQuery('type') as string
  const isInHome = isInPath('HOME')

  const sortBy =
    propFeedType || ((type === '' && isInHome ? 'icymi' : type) as FeedType)

  const isIcymiFeed = sortBy === 'icymi'

  const loadPrivate = (publicData?: any) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData.viewer?.recommendation?.feed.edges || []
    const publicIds = publiceEdges.map(({ node }: any) => node.id)

    client.query({
      query: FEED_ARTICLES_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  const { data, loading, error, edges, pageInfo, loadMore, client } = useFeed({
    query: FEED_ARTICLES_PUBLIC[sortBy as keyof typeof FEED_ARTICLES_PUBLIC],
    variables: {},
    connectionPath: 'viewer.recommendation.feed',
    privateQueryFn: loadPrivate,
    keyPrefix: sortBy,
  })

  const recommendation = data?.viewer?.recommendation
  let mixFeed = edges ? [...edges] : []

  if (mixFeed.length > 0 && isIcymiFeed) {
    mixFeed = JSON.parse(JSON.stringify(edges))

    const locs = Object.keys(horizontalFeeds).map((loc) => parseInt(loc, 10))
    locs.sort((a, b) => a - b)

    locs.forEach((loc) => {
      if (mixFeed.length >= loc) {
        mixFeed.splice(loc, 0, {
          Feed: horizontalFeeds[loc],
          __typename: 'HorizontalFeed',
        })
      }
    })
  }

  const itemCustomProps = {
    includesMetaData: !isIcymiFeed,
    excludesTimeStamp: isIcymiFeed,
  }

  const renderHeader = () => {
    if (!isIcymiFeed) return null
    const note = recommendation?.icymiTopic?.note || 'hello world'
    return (
      <>
        <section className={styles.header}>
          <h1>
            <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
          </h1>
          {note && <p className={styles.description}>{note}</p>}
        </section>
        <Spacer size="sp20" />
        <Announcements />
        {recommendation &&
          'icymiTopic' in recommendation &&
          recommendation.icymiTopic && (
            <IcymiCuratedFeed recommendation={recommendation} />
          )}
      </>
    )
  }

  return (
    <FeedRenderer
      loading={loading}
      error={error}
      edges={mixFeed}
      pageInfo={pageInfo}
      loadMore={loadMore}
      feedType={sortBy}
      renderHeader={renderHeader}
      itemCustomProps={itemCustomProps}
    />
  )
}

export default MainFeed
