import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'

import { TEMPORARY_CHANNEL_URL } from '~/common/enums'
import {
  ArticleDigestFeed,
  LanguageContext,
  Layout,
  useRoute,
} from '~/components'
import { ArticleFeedsCampaignPublicFragment } from '~/gql/graphql'

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
  campaign: ArticleFeedsCampaignPublicFragment
}) => {
  const { getQuery, setQuery, isPathStartWith } = useRoute()
  const qsType = getQuery('type') as CampaignFeedType
  const { lang } = useContext(LanguageContext)

  const [feedType, setFeedType] = useState<CampaignFeedType>(
    qsType || FEED_TYPE_ALL
  )

  const isInTemporaryChannel = isPathStartWith(TEMPORARY_CHANNEL_URL, true)

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

  const content = (
    <>
      {description && (
        <section className={styles.description}>{description}</section>
      )}
      <MainFeed feedType={feedType} camapign={campaign} />
    </>
  )

  return (
    <section className={styles.feeds}>
      <ArticleFeedsTabs
        feedType={feedType}
        setFeedType={changeFeed}
        campaign={campaign}
      />

      {isInTemporaryChannel ? (
        <Layout.Main>{content}</Layout.Main>
      ) : (
        <Layout.Main.Spacing hasVertical={false}>{content}</Layout.Main.Spacing>
      )}
    </section>
  )
}

ArticleFeeds.fragments = {
  public: gql`
    fragment ArticleFeedsCampaignPublic on WritingChallenge {
      id
      featuredDescriptionZhHant: featuredDescription(
        input: { language: zh_hant }
      )
      featuredDescriptionZhHans: featuredDescription(
        input: { language: zh_hans }
      )
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
  `,
  private: gql`
    fragment ArticleFeedsCampaignPrivate on WritingChallenge {
      id
      announcements {
        id
        ...ArticleDigestFeedArticlePrivate
      }
    }
    ${ArticleDigestFeed.fragments.article.private}
  `,
}

export default ArticleFeeds
