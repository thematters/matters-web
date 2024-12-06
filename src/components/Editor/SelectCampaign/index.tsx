import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { datetimeFormat } from '~/common/utils'
import { Form, LanguageContext, Spacer } from '~/components'
import {
  ArticleCampaignInput,
  CampaignState,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

export interface SelectCampaignProps {
  campaigns: EditorSelectCampaignFragment[]
  selectedCampaign: EditorSelectCampaignFragment | undefined
  selectedStage: string | undefined
  editCampaign: (value?: ArticleCampaignInput) => any
}

export const getSelectCampaigns = ({
  applied,
  attached,
  createdAt,
}: {
  applied?: EditorSelectCampaignFragment[]
  attached: Array<{
    campaign: { id: string }
    stage?: { id: string } | null
  }>
  createdAt: string
}) => {
  const campaigns = applied?.filter((campaign) => {
    const { start, end } = campaign?.writingPeriod || {}
    const isCampaignStarted = !!start && new Date(createdAt) >= new Date(start)
    const isCampaignEnded = !!end && new Date(createdAt) >= new Date(end)
    const isCampaignActive = campaign?.state === CampaignState.Active

    // only show appliedCampaign if the article or draft is created during the writing period
    return isCampaignStarted && !isCampaignEnded && isCampaignActive
  })

  const selectedCampaign = campaigns?.find((campaign) => {
    return attached.find((a) => a.campaign.id === campaign.id)
  })

  const selectedStage = attached.find(
    (a) => a.campaign.id === selectedCampaign?.id
  )?.stage?.id

  return {
    campaigns,
    selectedCampaign,
    selectedStage,
  }
}

const SelectCampaign = ({
  campaigns,
  selectedCampaign,
  selectedStage,
  editCampaign,
}: SelectCampaignProps) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<
    string | undefined
  >(selectedCampaign?.id)
  const [selectedStageId, setSelectedStageId] = useState<string | undefined>(
    selectedStage
  )

  useEffect(() => {
    setSelectedCampaignId(selectedCampaign?.id)
    setSelectedStageId(selectedStage)
  }, [selectedCampaign, selectedStage])

  const { lang } = useContext(LanguageContext)
  const RESET_CAMPAIGN_OPTION = {
    name: <FormattedMessage defaultMessage="Select Activity..." id="DpbBcd" />,
    value: undefined,
    selected: !selectedCampaignId,
  }
  const RESET_STAGE_OPTION = {
    name: <FormattedMessage defaultMessage="Select Date..." id="d5bM8A" />,
    value: undefined,
    selected: !selectedStageId,
  }
  const now = new Date()
  const availableStages = selectedCampaignId
    ? campaigns
        .find((c) => c.id === selectedCampaignId)
        ?.stages.filter((s) => {
          const period = s.period

          if (!period) return false

          return now >= new Date(period.start)
        })
    : undefined

  return (
    <>
      <Form.Select<string | undefined>
        name="select-campaign"
        onChange={(option) => {
          setSelectedCampaignId(option.value)
          setSelectedStageId(undefined)
          editCampaign(
            option.value !== undefined ? { campaign: option.value } : undefined
          )
        }}
        options={[
          RESET_CAMPAIGN_OPTION,
          ...campaigns.map((c) => {
            return {
              name: c.name,
              value: c.id,
              selected: c.id === selectedCampaignId,
            }
          }),
        ]}
        size={14}
        color="freeWriteBlue"
      />
      {selectedCampaignId && availableStages && availableStages.length > 0 && (
        <>
          <Spacer size="sp8" />
          <Form.Select<string | undefined>
            name="select-stage"
            onChange={(option) => {
              setSelectedStageId(option.value)
              editCampaign(
                option.value
                  ? { campaign: selectedCampaignId, stage: option.value }
                  : { campaign: selectedCampaignId }
              )
            }}
            options={[
              RESET_STAGE_OPTION,
              ...availableStages.reverse().map((s) => {
                return {
                  name: s.period?.start
                    ? `${s.name} - ${datetimeFormat.absolute({
                        date: s.period.start,
                        lang,
                        optionalYear: false,
                        utc8: true,
                      })}`
                    : s.name,
                  value: s.id,
                  selected: s.id === selectedStageId,
                }
              }),
            ]}
            size={14}
            color="freeWriteBlue"
          />
        </>
      )}
    </>
  )
}

SelectCampaign.fragments = gql`
  fragment EditorSelectCampaign on WritingChallenge {
    id
    state
    name
    writingPeriod {
      start
      end
    }
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

export default SelectCampaign
