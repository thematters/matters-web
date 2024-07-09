import gql from 'graphql-tag'

import { SquareTabs } from '~/components'
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
          onClick={() => setFeedType(LATEST_FEED_TYPE)}
        >
          Latest
        </SquareTabs.Tab>

        {stages.map((stage) =>
          shouldShowTab(stage.period?.start) ? (
            <SquareTabs.Tab
              selected={stage.name === feedType}
              onClick={() => setFeedType(stage.name)}
              key={stage.name}
            >
              {stage.name}
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
      name
      period {
        start
        end
      }
    }
  }
`

export default ArticleFeedsTabs
