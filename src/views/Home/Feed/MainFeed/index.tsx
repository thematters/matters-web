import React, { useContext, useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  Announcements,
  Media,
  Spacer,
  useFetchPolicy,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import type {
  HottestFeedPublicQuery,
  IcymiFeedPublicQuery,
  NewestFeedPublicQuery,
} from '~/gql/graphql'

import { useMixedFeed } from '../../common'
import { ArticleDigestCurated } from '../ArticleDigestCurated'
import { ChannelHeader } from '../ChannelHeader'
import FeedRenderer from '../FeedRenderer'
import { FEED_ARTICLES_PRIVATE, FEED_ARTICLES_PUBLIC } from '../gql'
import { IcymiCuratedFeed } from '../IcymiCuratedFeed'
import { FeedType } from '../index'
import feedStyles from '../styles.module.css'

interface MainFeedProps {
  feedType: FeedType
}

type FeedArticlesPublic =
  | NewestFeedPublicQuery
  | IcymiFeedPublicQuery
  | HottestFeedPublicQuery

const MainFeed: React.FC<MainFeedProps> = ({ feedType }) => {
  const viewer = useContext(ViewerContext)

  const { fetchPolicy } = useFetchPolicy()

  const { data, error, loading, fetchMore, client } =
    usePublicQuery<FeedArticlesPublic>(FEED_ARTICLES_PUBLIC[feedType], {
      fetchPolicy,
    })

  const isIcymiFeed = feedType === 'icymi'
  const isHottestFeed = feedType === 'hottest'
  const connectionPath = 'viewer.recommendation.feed'
  const recommendation = data?.viewer?.recommendation
  const result = recommendation?.feed
  const { edges, pageInfo } = result || {}
  const fetchedPrivateSortsRef = useRef<string[]>([])

  const loadPrivate = (publicData?: FeedArticlesPublic) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData.viewer?.recommendation?.feed.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: FEED_ARTICLES_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    const fetched = fetchedPrivateSortsRef.current.indexOf(feedType) >= 0
    if (loading || !edges || fetched || !viewer.isAuthed) {
      return
    }

    loadPrivate(data)
    fetchedPrivateSortsRef.current = [
      ...fetchedPrivateSortsRef.current,
      feedType,
    ]
  }, [!!edges, loading, viewer.id, feedType])

  const loadMore = async () => {
    if (loading) {
      return
    }

    const { data: newData } = await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })

    loadPrivate(newData)
    return { newData, count: edges?.length || 0 }
  }

  const mixFeed = useMixedFeed(
    edges || [],
    isIcymiFeed || isHottestFeed,
    feedType
  )

  const itemCustomProps = {
    includesMetaData: !isIcymiFeed && !isHottestFeed,
    excludesTimeStamp: isIcymiFeed || isHottestFeed,
  }

  const renderHeader = ({ loading }: { loading?: boolean }) => {
    const isIcymiFeed = feedType === 'icymi'
    const isHottestFeed = feedType === 'hottest'

    if (loading && (isHottestFeed || isIcymiFeed)) {
      return (
        <>
          <Media lessThan="lg">
            <Spacer size="sp20" />
            <Announcements.Placeholder />
            <ChannelHeader.Placeholder />
          </Media>
          <Media greaterThanOrEqual="lg">
            <ChannelHeader.Placeholder />
            {isIcymiFeed && (
              <section className={feedStyles.cards}>
                <ArticleDigestCurated.Placeholder />
                <ArticleDigestCurated.Placeholder />
                <ArticleDigestCurated.Placeholder />
              </section>
            )}
          </Media>
        </>
      )
    }

    if (isHottestFeed) {
      return (
        <>
          <Media lessThan="lg">
            <Spacer size="sp20" />
            <Announcements />
          </Media>

          <ChannelHeader
            name={
              <FormattedMessage
                defaultMessage="Trending"
                id="8tczzy"
                description="src/components/Layout/SideChannelNav/index.tsx"
              />
            }
            note={
              <FormattedMessage defaultMessage="Trending Now" id="+C53uY" />
            }
          />
        </>
      )
    }

    if (!isIcymiFeed) return null
    if (!recommendation) return null
    if (!('icymiTopic' in recommendation)) return null
    const note = recommendation?.icymiTopic?.note

    return (
      <>
        <Media lessThan="lg">
          <Spacer size="sp20" />
          <Announcements />
        </Media>

        <ChannelHeader
          name={<FormattedMessage defaultMessage="Featured" id="CnPG8j" />}
          note={note}
        />

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
