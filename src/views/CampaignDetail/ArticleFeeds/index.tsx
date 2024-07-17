import gql from 'graphql-tag'
import React, { useState } from 'react'

import { Layout, useRoute } from '~/components'
import { ArticleFeedsTabsCampaignFragment } from '~/gql/graphql'

import MainFeed from './MainFeed'
import styles from './styles.module.css'
import ArticleFeedsTabs, { CampaignFeedType, LATEST_FEED_TYPE } from './Tabs'

const ArticleFeeds = ({
  campaign,
}: {
  campaign: ArticleFeedsTabsCampaignFragment
}) => {
  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type') as CampaignFeedType

  const [feedType, setFeedType] = useState<CampaignFeedType>(
    qsType || LATEST_FEED_TYPE
  )

  const changeFeed = (newType: CampaignFeedType) => {
    setQuery('type', newType === LATEST_FEED_TYPE ? '' : newType)
    setFeedType(newType)
  }

  return (
    <section className={styles.feeds}>
      <ArticleFeedsTabs
        feedType={feedType}
        setFeedType={changeFeed}
        campaign={campaign}
      />

      <Layout.Main.Spacing hasVertical={false}>
        <MainFeed feedType={feedType} />
      </Layout.Main.Spacing>
    </section>
  )
}

ArticleFeeds.fragments = gql`
  fragment ArticleFeedsCampaign on WritingChallenge {
    id
    ...ArticleFeedsTabsCampaign
  }
  ${ArticleFeedsTabs.fragments}
`

export default ArticleFeeds
