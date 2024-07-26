import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics } from '~/common/utils'
import { LanguageContext, SquareTabs } from '~/components'
import { ArticleFeedsTabsCampaignFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type CampaignFeedType = string

export const LATEST_FEED_TYPE = 'latest'

interface ArticleFeedsTabsProps {
  feedType: CampaignFeedType
  setFeedType: (type: string) => void
  campaign: ArticleFeedsTabsCampaignFragment
}

const ArticleFeedsTabs = ({
  feedType,
  setFeedType,
  campaign,
}: ArticleFeedsTabsProps) => {
  const { lang } = useContext(LanguageContext)
  const stages = campaign.stages || []

  const shouldShowTab = (startedAt?: string) => {
    if (!startedAt) return true

    const now = new Date()
    return now >= new Date(startedAt)
  }

  return (
    <section className={styles.tabs}>
      <SquareTabs sticky>
        <SquareTabs.Tab
          selected={feedType === LATEST_FEED_TYPE}
          onClick={() => {
            setFeedType(LATEST_FEED_TYPE)

            analytics.trackEvent('click_button', {
              type: `campaign_detail_tab_${LATEST_FEED_TYPE}` as `campaign_detail_tab_${string}`,
              pageType: 'campaign_detail',
            })
          }}
        >
          <FormattedMessage defaultMessage="Latest" id="adThp5" />
        </SquareTabs.Tab>

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
              key={stage.id}
            >
              {
                stage[
                  lang === 'zh_hans'
                    ? 'nameZhHans'
                    : lang === 'zh_hant'
                    ? 'nameZhHant'
                    : 'nameEn'
                ]
              }
            </SquareTabs.Tab>
          ) : null
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
    }
  }
`

export default ArticleFeedsTabs
