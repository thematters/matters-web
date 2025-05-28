import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { Announcements, Media, Spacer, ViewerContext } from '~/components'

import { useMixedFeed } from '../../common/useMixedFeed'
import FeedRenderer from '../components/FeedRenderer'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC } from '../gql'
import { useFeed } from '../hooks/useFeed'
import { IcymiCuratedFeed } from '../IcymiCuratedFeed'
import { FeedType } from '../index'
import styles from '../styles.module.css'
interface MainFeedProps {
  feedType: FeedType
}

const MainFeed: React.FC<MainFeedProps> = ({ feedType }) => {
  const viewer = useContext(ViewerContext)

  const isIcymiFeed = feedType === 'icymi'

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
    query: FEED_ARTICLES_PUBLIC[feedType as keyof typeof FEED_ARTICLES_PUBLIC],
    variables: {},
    connectionPath: 'viewer.recommendation.feed',
    privateQueryFn: loadPrivate,
    keyPrefix: feedType,
  })

  const recommendation = data?.viewer?.recommendation
  const mixFeed = useMixedFeed(edges, isIcymiFeed)

  const itemCustomProps = {
    includesMetaData: !isIcymiFeed,
    excludesTimeStamp: isIcymiFeed,
  }

  const renderHeader = () => {
    if (!isIcymiFeed) return null
    const note = recommendation?.icymiTopic?.note
    return (
      <>
        <Media lessThan="lg">
          <Spacer size="sp20" />
          <Announcements />
        </Media>
        <section className={styles.header}>
          <h1>
            <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
          </h1>
          {note && <p className={styles.description}>{note}</p>}
        </section>

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
      feedType={feedType}
      renderHeader={renderHeader}
      itemCustomProps={itemCustomProps}
    />
  )
}

export default MainFeed
