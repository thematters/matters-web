import gql from 'graphql-tag'
import { useContext, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import { LanguageContext, SquareTabs, useChannels } from '~/components'
import {
  ArticleFeedsCampaignPublicFragment,
  ArticleFeedsTabsCampaignFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

export type CampaignFeedType = string

export const FEED_TYPE_ALL = 'all'
export const FEED_TYPE_FEATURED = 'featured'
export const FEED_TYPE_ANNOUNCEMENT = 'announcement'

interface ArticleFeedsTabsProps {
  feedType: CampaignFeedType
  setFeedType: (type: string) => void
  campaign: ArticleFeedsTabsCampaignFragment &
    ArticleFeedsCampaignPublicFragment
}

const ArticleFeedsTabs = ({
  feedType,
  setFeedType,
  campaign,
}: ArticleFeedsTabsProps) => {
  const { lang } = useContext(LanguageContext)
  const intl = useIntl()
  const stages = campaign.stages || []

  const tabsRef = useRef<{ [key: string]: HTMLLIElement | null }>({})

  useEffect(() => {
    const selectedTabRef = tabsRef.current[feedType]
    if (selectedTabRef) {
      selectedTabRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [feedType])

  const shouldShowTab = (startedAt?: string) => {
    if (!startedAt) return true

    const now = new Date()
    return now >= new Date(startedAt)
  }

  const { isInWritingChallengeChannel } = useChannels()

  const shouldShowFeaturedTab = campaign.featuredArticles.totalCount > 0
  const shouldShowAnnouncementTab = campaign.announcements.length > 0

  return (
    <section className={styles.tabs}>
      <SquareTabs spacing={!isInWritingChallengeChannel ? 'sm' : undefined}>
        <SquareTabs.Tab
          ref={(el) => (tabsRef.current[FEED_TYPE_ALL] = el)}
          selected={feedType === FEED_TYPE_ALL}
          onClick={() => {
            setFeedType(FEED_TYPE_ALL)

            analytics.trackEvent('click_button', {
              type: `campaign_detail_tab_${FEED_TYPE_ALL}` as `campaign_detail_tab_${string}`,
              pageType: 'campaign_detail',
            })
          }}
          title={intl.formatMessage({
            defaultMessage: 'All',
            id: 'zQvVDJ',
          })}
        />

        {shouldShowFeaturedTab && (
          <SquareTabs.Tab
            ref={(el) => (tabsRef.current[FEED_TYPE_FEATURED] = el)}
            selected={feedType === FEED_TYPE_FEATURED}
            onClick={() => {
              setFeedType(FEED_TYPE_FEATURED)

              analytics.trackEvent('click_button', {
                type: `campaign_detail_tab_${FEED_TYPE_FEATURED}` as `campaign_detail_tab_${string}`,
                pageType: 'campaign_detail',
              })
            }}
            title={intl.formatMessage({
              defaultMessage: 'Featured',
              id: 'CnPG8j',
            })}
            theme="green"
          />
        )}

        {[...stages].reverse().map((stage) =>
          shouldShowTab(stage.period?.start) ? (
            <SquareTabs.Tab
              key={stage.id}
              ref={(el) => (tabsRef.current[stage.id] = el)}
              selected={stage.id === feedType}
              onClick={() => {
                setFeedType(stage.id)

                analytics.trackEvent('click_button', {
                  type: `campaign_detail_tab_${stage.id}` as `campaign_detail_tab_${string}`,
                  pageType: 'campaign_detail',
                })
              }}
              title={
                stage[
                  lang === 'zh_hans'
                    ? 'nameZhHans'
                    : lang === 'zh_hant'
                      ? 'nameZhHant'
                      : 'nameEn'
                ]
              }
            />
          ) : null
        )}

        {shouldShowAnnouncementTab && (
          <SquareTabs.Tab
            ref={(el) => (tabsRef.current[FEED_TYPE_ANNOUNCEMENT] = el)}
            selected={feedType === FEED_TYPE_ANNOUNCEMENT}
            onClick={() => {
              setFeedType(FEED_TYPE_ANNOUNCEMENT)

              analytics.trackEvent('click_button', {
                type: `campaign_detail_tab_${FEED_TYPE_ANNOUNCEMENT}` as `campaign_detail_tab_${string}`,
                pageType: 'campaign_detail',
              })
            }}
            theme="gold"
            title={intl.formatMessage({
              defaultMessage: 'Announcement',
              id: 'Sj+TN8',
            })}
          />
        )}
      </SquareTabs>
    </section>
  )
}

ArticleFeedsTabs.fragments = gql`
  fragment ArticleFeedsTabsCampaign on WritingChallenge {
    id
    featuredArticles: articles(
      input: { first: 0, filter: { featured: true } }
    ) {
      totalCount
    }
    stages {
      id
      nameZhHant: name(input: { language: zh_hant })
      nameZhHans: name(input: { language: zh_hans })
      nameEn: name(input: { language: en })
      period {
        start
        end
      }
      descriptionZhHant: description(input: { language: zh_hant })
      descriptionZhHans: description(input: { language: zh_hans })
      descriptionEn: description(input: { language: en })
    }
  }
`

export default ArticleFeedsTabs
