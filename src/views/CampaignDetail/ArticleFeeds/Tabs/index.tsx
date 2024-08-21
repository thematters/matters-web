import gql from 'graphql-tag'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import { LanguageContext, SquareTabs } from '~/components'
import {
  ArticleFeedsCampaignFragment,
  ArticleFeedsTabsCampaignFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

export type CampaignFeedType = string

export const FEED_TYPE_ALL = 'all'
export const FEED_TYPE_ANNOUNCEMENT = 'announcement'

interface ArticleFeedsTabsProps {
  feedType: CampaignFeedType
  setFeedType: (type: string) => void
  campaign: ArticleFeedsTabsCampaignFragment & ArticleFeedsCampaignFragment
}

const ArticleFeedsTabs = ({
  feedType,
  setFeedType,
  campaign,
}: ArticleFeedsTabsProps) => {
  const { lang } = useContext(LanguageContext)
  const intl = useIntl()
  const stages = campaign.stages || []

  const shouldShowTab = (startedAt?: string) => {
    if (!startedAt) return true

    const now = new Date()
    return now >= new Date(startedAt)
  }

  const shouldShowAnnouncementTab = campaign.announcements.length > 0

  return (
    <section className={styles.tabs}>
      <SquareTabs sticky>
        <SquareTabs.Tab
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

        {[...stages].reverse().map((stage) =>
          shouldShowTab(stage.period?.start) ? (
            <SquareTabs.Tab
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
              key={stage.id}
            />
          ) : null
        )}

        {shouldShowAnnouncementTab && (
          <SquareTabs.Tab
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
