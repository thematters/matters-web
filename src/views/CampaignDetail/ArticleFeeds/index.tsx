import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'

import {
  ArticleDigestFeed,
  LanguageContext,
  Layout,
  useRoute,
} from '~/components'
import { ArticleFeedsCampaignFragment } from '~/gql/graphql'

import MainFeed from './MainFeed'
import styles from './styles.module.css'
import ArticleFeedsTabs, {
  CampaignFeedType,
  FEED_TYPE_ALL,
  FEED_TYPE_FEATURED,
} from './Tabs'

const ArticleFeeds = ({
  campaign,
}: {
  campaign: ArticleFeedsCampaignFragment
}) => {
  const { getQuery, setQuery } = useRoute()
  const qsType = getQuery('type') as CampaignFeedType
  const { lang } = useContext(LanguageContext)

  const [feedType, setFeedType] = useState<CampaignFeedType>(
    qsType || FEED_TYPE_ALL
  )

  const changeFeed = (newType: CampaignFeedType) => {
    setQuery('type', newType === FEED_TYPE_ALL ? '' : newType)
    setFeedType(newType)
  }

  const isFeaturedFeed = feedType === FEED_TYPE_FEATURED
  const selectedStage = campaign.stages.filter(
    (stage) => stage.id === feedType
  )[0]

  const featuredDescription =
    campaign[
      lang === 'zh_hans'
        ? 'featuredDescriptionZhHans'
        : lang === 'zh_hant'
          ? 'featuredDescriptionZhHant'
          : 'featuredDescriptionEn'
    ]

  const stageDescription =
    selectedStage &&
    selectedStage[
      lang === 'zh_hans'
        ? 'descriptionZhHans'
        : lang === 'zh_hant'
          ? 'descriptionZhHant'
          : 'descriptionEn'
    ]
  const description = isFeaturedFeed ? featuredDescription : stageDescription

  return (
    <section className={styles.feeds}>
      <ArticleFeedsTabs
        feedType={feedType}
        setFeedType={changeFeed}
        campaign={campaign}
      />

      <Layout.Main.Spacing hasVertical={false}>
        {description && (
          <section className={styles.description}>{description}</section>
        )}

        <MainFeed feedType={feedType} camapign={campaign} />
      </Layout.Main.Spacing>
    </section>
  )
}

ArticleFeeds.fragments = gql`
  fragment ArticleFeedsCampaign on WritingChallenge {
    id
    featuredDescriptionZhHant: featuredDescription(input: { language: zh_hant })
    featuredDescriptionZhHans: featuredDescription(input: { language: zh_hans })
    featuredDescriptionEn: featuredDescription(input: { language: en })
    announcements {
      id
      campaigns {
        campaign {
          id
          shortHash
        }
        stage {
          id
          nameZhHant: name(input: { language: zh_hant })
          nameZhHans: name(input: { language: zh_hans })
          nameEn: name(input: { language: en })
        }
      }
      ...ArticleDigestFeedArticlePublic
      ...ArticleDigestFeedArticlePrivate
    }
    ...ArticleFeedsTabsCampaign
  }
  ${ArticleFeedsTabs.fragments}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

export default ArticleFeeds
