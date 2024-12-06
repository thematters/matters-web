import { useEffect, useState } from 'react'

import { getSelectCampaigns } from '~/components/Editor/SelectCampaign'
import {
  ArticleCampaignInput,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import { Article } from '../index'

export const useCampaignState = (article: Article) => {
  const appliedCampaigns = article.author.campaigns.edges?.map((e) => e.node)

  const {
    campaigns: selectableCampaigns,
    selectedCampaign: initialSelectedCampaign,
    selectedStage: initialSelectedStage,
  } = getSelectCampaigns({
    applied: appliedCampaigns,
    attached: article.campaigns,
    createdAt: article.createdAt,
  })

  const [campaign, setCampaign] = useState<ArticleCampaignInput | undefined>(
    initialSelectedCampaign?.id && initialSelectedStage
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
