import { useEffect, useState } from 'react'

import { getSelectCampaigns } from '~/components/Editor/SelectCampaign'
import {
  ArticleCampaignInput,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import { Article } from '../index'

export const useCampaignState = (article: Article) => {
  const appliedCampaigns = article.author.campaigns.edges?.map((e) => e.node)

  // Check if the article is in any campaign's announcements
  const isAnnouncement = article.campaigns.some((campaignItem) =>
    campaignItem.campaign?.announcements?.some(
      (announcement) => announcement.id === article.id
    )
  )

  const {
    campaigns: selectableCampaigns,
    selectedCampaign: initialSelectedCampaign,
    selectedStage: initialSelectedStage,
  } = isAnnouncement // hide campaign selection for announcement
    ? {
        campaigns: [],
        selectedCampaign: undefined,
        selectedStage: undefined,
      }
    : getSelectCampaigns({
        applied: appliedCampaigns,
        attached: article.campaigns,
        createdAt: article.createdAt,
      })

  const [campaign, setCampaign] = useState<ArticleCampaignInput | undefined>(
    initialSelectedCampaign?.id
      ? {
          campaign: initialSelectedCampaign.id,
          stage: initialSelectedStage,
        }
      : undefined
  )

  // UI state for selected campaign/stage
  const [selectedCampaign, setSelectedCampaign] = useState<
    EditorSelectCampaignFragment | undefined
  >(initialSelectedCampaign)
  const [selectedStage, setSelectedStage] = useState<string | undefined>(
    initialSelectedStage
  )

  // Keep UI state in sync with campaign input
  useEffect(() => {
    setSelectedCampaign(
      selectableCampaigns?.find((c) => c.id === campaign?.campaign)
    )
    setSelectedStage(campaign?.stage || undefined)
  }, [campaign, selectableCampaigns])

  return {
    campaign,
    setCampaign,
    selectedCampaign,
    selectedStage,
    selectableCampaigns,
  }
}
